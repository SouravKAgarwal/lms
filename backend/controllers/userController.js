import User from "../models/User.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../config/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { createActivationToken } from "../utils/createToken.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt.js";
import { redis } from "../config/redis.js";
import { allUsers, getUserById, updateRole } from "../services/userServices.js";
import cloudinary from "cloudinary";

export const registerUser = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isExists = await User.findOne({ email });
    if (isExists) {
      return next(new ErrorHandler("Email already exists", 400));
    }
    const user = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);
    const { activationCode, token } = activationToken;

    try {
      await sendVerificationEmail(user, {
        subject: "Activate your account",
        activationCode,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email ${user.email} to activate your account`,
        token,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const activateUser = catchAsyncError(async (req, res, next) => {
  try {
    const { activationCode, token } = req.body;
    const newUser = jwt.verify(token, process.env.JWT_SECRET);

    if (newUser.activationCode !== activationCode) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { name, email, password } = newUser.user;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return next(new ErrorHandler("Email already in use", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide user credentials", 404));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 404));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password", 404));
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    redis.del(req.user?._id);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 404));
  }
});

export const updateAccessToken = catchAsyncError(async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

    if (!decoded) {
      return next(new ErrorHandler("Could not refresh token", 400));
    }

    const session = await redis.get(decoded.id);

    if (!session) {
      return next(new ErrorHandler("Please login again!", 400));
    }

    const user = JSON.parse(session);

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "3d",
    });

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    await redis.set(user._id, JSON.stringify(user), "EX", 604800);
    req.user = user;
    return next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

export const getUserInfo = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
    getUserById(userId, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

export const socialAuth = catchAsyncError(async (req, res, next) => {
  try {
    const { email, avatar, name } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const newUser = await User.create({
        email,
        avatar,
        name,
        isVerified: true,
      });
      sendToken(newUser, 200, res);
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

export const updateUserInfo = catchAsyncError(async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (name && user) {
      user.name = name;
    }

    await user.save();

    await redis.set(userId, JSON.stringify(user));

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

export const updateUserPassword = catchAsyncError(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (user.password === undefined) {
      return next(new ErrorHandler("Invalid User", 404));
    }

    const isPasswordMatch = await user.comparePassword(oldPassword);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Incorrect password", 404));
    }

    user.password = newPassword;
    await user.save();

    await redis.set(req.user._id, JSON.stringify(user));

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

export const updateUserAvatar = catchAsyncError(async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (avatar && user) {
      if (user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else {
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    await user.save();
    await redis.set(userId, JSON.stringify(user));

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  try {
    allUsers(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const isExist = await User.findOne({ email });

    if (isExist) {
      const id = isExist._id;
      updateRole(id, role, res);
    } else {
      res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User not found", 400));

    await user.deleteOne({ id });
    await redis.del(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

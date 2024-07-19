import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegexPattern = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Enter your name"] },
    email: {
      type: String,
      required: [true, "Enter your email"],
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value);
        },
        message: "Enter a valid email!",
      },
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Password must be atleast 6 characters"],
      select: false,
    },
    avatar: { public_id: String, url: String },
    role: { type: String, default: "user" },
    isVerified: { type: Boolean, default: false },
    courses: [{ type: String }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.signAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "5m",
  });
};

userSchema.methods.signRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "3d",
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

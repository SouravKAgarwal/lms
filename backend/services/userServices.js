import { redis } from "../config/redis.js";
import User from "../models/User.js";

export const getUserById = async (id, res) => {
  const userJSON = await redis.get(id);

  if (userJSON) {
    const user = JSON.parse(userJSON);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

export const allUsers = async (res) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

export const updateRole = async (id, role, res) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};

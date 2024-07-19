import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import Order from "../models/Order.js";

export const newOrder = catchAsyncError(async (data, res) => {
  const order = await Order.create(data);
  res.status(201).json({
    success: true,
    order,
  });
});


export const allOrders = async (res) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    orders,
  });
};
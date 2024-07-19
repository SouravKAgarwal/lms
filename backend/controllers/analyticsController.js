import { generateLast12MonthData } from "../utils/analytics.js";
import User from "../models/User.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../config/errorHandler.js";
import Course from "../models/Course.js";
import Order from "../models/Order.js";

export const getUserAnalytics = catchAsyncError(async (req, res, next) => {
  try {
    const users = await generateLast12MonthData(User);

    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getCourseAnalytics = catchAsyncError(async (req, res, next) => {
  try {
    const courses = await generateLast12MonthData(Course);

    res.status(201).json({
      success: true,
      courses,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getOrderAnalytics = catchAsyncError(async (req, res, next) => {
  try {
    const orders = await generateLast12MonthData(Order);

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

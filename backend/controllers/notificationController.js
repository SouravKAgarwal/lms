import ErrorHandler from "../config/errorHandler.js";
import Notification from "../models/Notification.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import cron from "node-cron";

export const getNotifications = catchAsyncError(async (req, res, next) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const updateNotificationStatus = catchAsyncError(
  async (req, res, next) => {
    try {
      const notification = await Notification.findById(req.params.id);

      notification.status = "read";
      await notification.save();

      const notifications = await Notification.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Notification.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Notifications deleted successfully");
});

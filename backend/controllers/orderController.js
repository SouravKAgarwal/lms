import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../config/errorHandler.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Notification from "../models/Notification.js";
import { allOrders, newOrder } from "../services/orderServices.js";
import { sendOrderConfirmation } from "../utils/sendEmail.js";
import Stripe from "stripe";
import { redis } from "../config/redis.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = catchAsyncError(async (req, res, next) => {
  try {
    const { courseId, paymentInfo } = req.body;

    if (!paymentInfo) {
      return next(new ErrorHandler("Payment information required", 400));
    }

    const paymentIntentId = paymentInfo.id;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return next(new ErrorHandler("Payment not authorised", 400));
    }

    const user = await User.findById(req.user._id);
    const courseExist = user.courses.some((course) => course === courseId);

    if (courseExist) {
      return next(
        new ErrorHandler("You have already purchased this course", 400)
      );
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 400));
    }

    const data = {
      courseId,
      userId: user._id,
      paymentInfo,
    };

    const mailData = {
      order: {
        _id: course._id.toString(),
        name: course.name,
        price: course.price,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
      options: {
        email: user.email,
        subject: "Order Confirmation",
      },
    };

    await sendOrderConfirmation(mailData);

    user.courses.push(courseId);
    course.purchased += 1;
    await user.save();
    await course.save();

    await redis.set(req.user._id, JSON.stringify(user));

    await Notification.create({
      userId: user._id,
      title: "New Order",
      message: `You have a new order for ${course.name} from ${user.name}`,
    });

    await newOrder(data, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getAllOrders = catchAsyncError(async (req, res, next) => {
  try {
    allOrders(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const sendStripePublishableKey = catchAsyncError(
  async (req, res, next) => {
    res.status(200).json({
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

export const newPayment = catchAsyncError(async (req, res, next) => {
  try {
    const payment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "E-Learning",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(201).json({
      success: true,
      client_secret: payment.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

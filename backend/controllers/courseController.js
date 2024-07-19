import ErrorHandler from "../config/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import { allCourses, createCourse } from "../services/courseServices.js";
import Course from "../models/Course.js";
import { redis } from "../config/redis.js";
import mongoose from "mongoose";
import axios from "axios";
import { sendReplyNotificationMail } from "../utils/sendEmail.js";
import Notification from "../models/Notification.js";

export const uploadCourse = catchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;

    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });
      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    createCourse(data, res, next);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const editCourse = catchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;

    const id = req.params.id;
    const courseData = await Course.findById(id);

    if (thumbnail && !thumbnail.startsWith("https")) {
      await cloudinary.v2.uploader.destroy(thumbnail.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });
      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    if (thumbnail.startsWith("https")) {
      data.thumbnail = {
        public_id: courseData.thumbnail.public_id,
        url: courseData.thumbnail.url,
      };
    }

    const courseId = req.params.id;

    const course = await Course.findByIdAndUpdate(
      courseId,
      { $set: data },
      { new: true }
    );

    res.status(201).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getSingleCourse = catchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId).select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getCourses = catchAsyncError(async (req, res, next) => {
  try {
    const courses = await Course.find().select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getCourseByUser = catchAsyncError(async (req, res, next) => {
  try {
    const userCourseList = req.user?.courses;
    const courseId = req.params.id;

    const courseExists = userCourseList?.find((course) => course === courseId);

    if (!courseExists) {
      return next(
        new ErrorHandler("You are not eligible to access this course", 404)
      );
    }

    const course = await Course.findById(courseId);
    const content = course.courseData;

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const addQuestions = catchAsyncError(async (req, res, next) => {
  try {
    const { question, courseId, contentId } = req.body;
    const course = await Course.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content ID", 400));
    }
    const courseContent = course.courseData.find(
      (item) => item._id.toString() === contentId
    );
    if (!courseContent) {
      return next(new ErrorHandler("Invalid content ID", 400));
    }

    const newQuestion = {
      user: req.user,
      question,
      questionReplies: [],
    };

    courseContent.questions.push(newQuestion);
    await Notification.create({
      userId: req.user._id,
      title: "New Question",
      message: `You have a new question in ${courseContent.title}`,
    });

    await course.save();

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const addAnswer = catchAsyncError(async (req, res, next) => {
  try {
    const { answer, courseId, contentId, questionId } = req.body;

    const course = await Course.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content ID", 400));
    }
    const courseContent = course.courseData.find(
      (item) => item._id.toString() === contentId
    );
    if (!courseContent) {
      return next(new ErrorHandler("Invalid content ID", 400));
    }

    const question = courseContent.questions.find(
      (item) => item._id.toString() === questionId
    );

    if (!question) {
      return next(new ErrorHandler("Invalid question ID", 400));
    }

    const newAnswer = {
      user: req.user,
      answer,
    };

    question.questionReplies.push(newAnswer);
    await course.save();

    if (req.user._id === question.user._id) {
      await Notification.create({
        userId: req.user._id,
        title: "New Question Reply",
        message: `question Replied for ${courseContent.title}`,
      });
    } else {
      const data = {
        name: question.user.name,
        email: question.user.email,
        title: courseContent.title,
        subject: "Reply to your question",
      };

      try {
        await sendReplyNotificationMail(data);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const addReview = catchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userCourseList = req.user.courses;

    const courseExists = userCourseList.some((course) => course === courseId);

    if (!courseExists) {
      return next(
        new ErrorHandler("You are not eligible to access this course", 400)
      );
    }

    const course = await Course.findById(courseId);
    const { review, rating } = req.body;

    const reviewData = {
      user: req.user,
      comment: review,
      rating,
    };

    course.reviews.push(reviewData);

    let total = 0;
    course.reviews.forEach((rev) => (total += rev.rating));

    course.ratings = total / course.reviews.length;
    await course.save();

    await Notification.create({
      userId: req.user._id,
      title: "New Review Recieved",
      message: `${req.user.name} has given a review on ${course.name}`,
    });

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const addReplyToReview = catchAsyncError(async (req, res, next) => {
  try {
    const { comment, courseId, reviewId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return next(new ErrorHandler("Course not found", 400));

    const review = course.reviews.find(
      (rev) => rev._id.toString() === reviewId
    );
    if (!review) return next(new ErrorHandler("Review not found", 400));

    const replyData = {
      user: req.user,
      comment,
    };

    if (!review.commentReplies) review.commentReplies = [];

    review.commentReplies.push(replyData);
    await course.save();

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  try {
    allCourses(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) return next(new ErrorHandler("Course not found", 400));

    await course.deleteOne({ id });
    await redis.del(id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const generateVideoUrl = catchAsyncError(async (req, res, next) => {
  try {
    const { videoId } = req.body;
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      { ttl: 300 },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Apisecret ${process.env.VDOCIPHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

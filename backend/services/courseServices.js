import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import Course from "../models/Course.js";

export const createCourse = catchAsyncError(async (data, res) => {
  const course = await Course.create(data);
  res.status(201).json({
    success: true,
    course,
  });
});

export const allCourses = async (res) => {
  const courses = await Course.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};

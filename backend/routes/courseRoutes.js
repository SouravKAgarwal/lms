import express from "express";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";
import {
  addAnswer,
  addQuestions,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getCourseByUser,
  getCourses,
  getSingleCourse,
  uploadCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/create", protect, authorizeRoles("admin"), uploadCourse);
router.put("/edit/:id", protect, authorizeRoles("admin"), editCourse);
router.get("/all-courses", protect, authorizeRoles("admin"), getAllCourses);
router.get("/all", getCourses);
router.get("/:id", getSingleCourse);
router.get("/content/:id", protect, getCourseByUser);
router.put("/question", protect, addQuestions);
router.put("/answer", protect, addAnswer);
router.post("/video", generateVideoUrl);
router.put("/review/reply", protect, authorizeRoles("admin"), addReplyToReview);
router.put("/review/:id", protect, addReview);
router.delete("/delete/:id", protect, authorizeRoles("admin"), deleteCourse);

export default router;

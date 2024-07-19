import express from "express";
import {
  getCourseAnalytics,
  getOrderAnalytics,
  getUserAnalytics,
} from "../controllers/analyticsController.js";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getUserAnalytics);
router.get("/courses", protect, authorizeRoles("admin"), getCourseAnalytics);
router.get("/orders", protect, authorizeRoles("admin"), getOrderAnalytics);

export default router;

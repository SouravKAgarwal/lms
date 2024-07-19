import express from "express";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";
import {
  getNotifications,
  updateNotificationStatus,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/all", protect, authorizeRoles("admin"), getNotifications);
router.put("/:id", protect, authorizeRoles("admin"), updateNotificationStatus);

export default router;

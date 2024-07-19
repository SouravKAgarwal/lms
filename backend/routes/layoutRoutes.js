import express from "express";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layoutController.js";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, authorizeRoles("admin"), createLayout);
router.put("/edit", protect, authorizeRoles("admin"), editLayout);
router.get("/:type", getLayoutByType);

export default router;

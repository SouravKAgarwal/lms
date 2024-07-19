import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  activateUser,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", activateUser);
router.post("/login", loginUser);
router.get("/refresh", updateAccessToken);
router.get("/logout", protect, logoutUser);
router.post("/auth/social", socialAuth);

export default router;

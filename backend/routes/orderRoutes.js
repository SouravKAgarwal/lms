import express from "express";
import {
  createOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/orderController.js";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/all-orders", protect, authorizeRoles("admin"), getAllOrders);
router.get("/payment/stripe-key", sendStripePublishableKey);
router.post("/payment", protect, newPayment);

export default router;

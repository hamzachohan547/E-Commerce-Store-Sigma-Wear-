import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// ==========================================
// CUSTOMER ROUTES
// ==========================================

// Create Order
router.post(
  "/",
  protect,
  createOrder
);

// My Orders
router.get(
  "/my-orders",
  protect,
  getMyOrders
);

// Single Order
router.get(
  "/:id",
  protect,
  getOrderById
);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Get All Orders
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllOrders
);

// Update Order Status
router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);

export default router;  
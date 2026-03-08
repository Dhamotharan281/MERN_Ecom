import express from "express";
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  updateOrderToPaid,
  cancelMyOrder,
  returnMyOrder,
  downloadInvoice,
} from "../controllers/orderController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.get("/:id/invoice", protect, downloadInvoice);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/cancel", protect, cancelMyOrder);
router.put("/:id/return", protect, returnMyOrder);

router.get("/", protect, authorize("ADMIN", "SUPER_ADMIN"), getAllOrders);
router.put("/:id/status", protect, authorize("ADMIN", "SUPER_ADMIN"), updateOrderStatus);

export default router;

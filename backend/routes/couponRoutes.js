import express from "express";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} from "../controllers/couponController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/validate", protect, validateCoupon);

router.get("/", protect, authorize("ADMIN", "SUPER_ADMIN"), getCoupons);
router.post("/", protect, authorize("ADMIN", "SUPER_ADMIN"), createCoupon);
router.put("/:id", protect, authorize("ADMIN", "SUPER_ADMIN"), updateCoupon);
router.delete("/:id", protect, authorize("ADMIN", "SUPER_ADMIN"), deleteCoupon);

export default router;

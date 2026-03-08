import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  moveToSaveForLater,
  moveSavedItemToCart,
  applyCouponToCart,
  removeCouponFromCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/", protect, updateCartItem);
router.delete("/:itemId", protect, removeFromCart);
router.delete("/", protect, clearCart);

router.post("/:itemId/save-for-later", protect, moveToSaveForLater);
router.post("/saved/:itemId/move-to-cart", protect, moveSavedItemToCart);
router.post("/coupon", protect, applyCouponToCart);
router.delete("/coupon", protect, removeCouponFromCart);

export default router;

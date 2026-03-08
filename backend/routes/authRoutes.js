import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
  sendEmailVerification,
  verifyEmail,
  sendPhoneOtp,
  verifyPhoneOtp,
  googleLogin,
  addAddress,
  updateAddress,
  deleteAddress,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveWishlistToCart,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/email/verify/send", protect, sendEmailVerification);
router.get("/email/verify/:token", verifyEmail);
router.post("/phone/otp/send", protect, sendPhoneOtp);
router.post("/phone/otp/verify", protect, verifyPhoneOtp);

router.post("/addresses", protect, addAddress);
router.put("/addresses/:addressId", protect, updateAddress);
router.delete("/addresses/:addressId", protect, deleteAddress);

router.get("/wishlist", protect, getWishlist);
router.post("/wishlist/:productId", protect, addToWishlist);
router.delete("/wishlist/:productId", protect, removeFromWishlist);
router.post("/wishlist/:productId/move-to-cart", protect, moveWishlistToCart);

export default router;

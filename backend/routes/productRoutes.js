import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getFeaturedProducts,
  getRecommendedProducts,
  getRelatedProducts,
  getRecentlyViewedProducts,
  updateReview,
  deleteReview,
  approveSellerProduct,
  rejectSellerProduct,
} from "../controllers/productController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommended", protect, getRecommendedProducts);
router.get("/recently-viewed", protect, getRecentlyViewedProducts);
router.get("/:id/related", getRelatedProducts);
router.get("/:id", getProductById);

router.post("/", protect, authorize("ADMIN", "SUPER_ADMIN", "SELLER"), createProduct);
router.put("/:id", protect, authorize("ADMIN", "SUPER_ADMIN"), updateProduct);
router.delete("/:id", protect, authorize("ADMIN", "SUPER_ADMIN"), deleteProduct);
router.put("/:id/approve", protect, authorize("ADMIN", "SUPER_ADMIN"), approveSellerProduct);
router.put("/:id/reject", protect, authorize("ADMIN", "SUPER_ADMIN"), rejectSellerProduct);

router.post("/:id/reviews", protect, addReview);
router.put("/:id/reviews", protect, updateReview);
router.delete("/:id/reviews/:reviewId", protect, deleteReview);

export default router;

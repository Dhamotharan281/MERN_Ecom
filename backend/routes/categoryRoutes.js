import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/categoryController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", protect, authorize("ADMIN", "SUPER_ADMIN"), createCategory);
router.put("/categories/:id", protect, authorize("ADMIN", "SUPER_ADMIN"), updateCategory);
router.delete("/categories/:id", protect, authorize("ADMIN", "SUPER_ADMIN"), deleteCategory);

router.get("/brands", getBrands);
router.post("/brands", protect, authorize("ADMIN", "SUPER_ADMIN"), createBrand);
router.put("/brands/:id", protect, authorize("ADMIN", "SUPER_ADMIN"), updateBrand);
router.delete("/brands/:id", protect, authorize("ADMIN", "SUPER_ADMIN"), deleteBrand);

export default router;

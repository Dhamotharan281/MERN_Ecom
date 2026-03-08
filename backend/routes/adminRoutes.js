import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  banUser,
  unbanUser,
} from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.use(authorize("ADMIN", "SUPER_ADMIN"));

router.get("/dashboard", getDashboardStats);
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.put("/users/:id/ban", banUser);
router.put("/users/:id/unban", unbanUser);

export default router;

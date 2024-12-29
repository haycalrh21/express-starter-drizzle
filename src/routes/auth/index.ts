import { Router } from "express";
import { insertUserSchema, loginUserSchema } from "../../db/userSchema.js";
import { validateData } from "../../middlewares/validationMiddlewares.js";
import {
  registerUser,
  loginUser,
  getAllUsers,
  logoutUser,
  getUserById,
} from "./authController.js";
import { verifyToken } from "../../middlewares/authMiddlewares.js";

const router = Router();
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", validateData(insertUserSchema), registerUser);
router.post("/login", validateData(loginUserSchema), loginUser);
router.post("/logout", verifyToken, logoutUser);
export default router;

import { Router } from "express";
import { checkToken } from "../verify/verifyController.js";
import { CreateUnit, GetUnit } from "./unitController.js";

const router = Router();

router.get("/", checkToken, GetUnit);
router.post("/register", checkToken, CreateUnit);

export default router;

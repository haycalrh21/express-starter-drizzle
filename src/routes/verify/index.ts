import { Router } from "express";

import { verifyToken } from "./verifyController.js";

const router = Router();

router.get("/", verifyToken);

export default router;

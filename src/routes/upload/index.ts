import { Router } from "express";
import { uploadImage } from "./uploadController";

const router = Router();
router.post("/", uploadImage);

export default router;

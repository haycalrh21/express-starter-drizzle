import { Router } from "express";
import {
  CreateBathroom,
  CreateBedroom,
  CreateType,
  GetBathroom,
  GetBedroom,
  GetTypeUnit,
} from "./unitFloorController.js";
import { checkToken } from "../../../routes/verify/verifyController.js";
import { z } from "zod";
import { validateData } from "../../../middlewares/validationMiddlewares.js";
const router = Router();

export const CreateTypeSchema = z.object({
  type: z
    .string({
      required_error: " is required",
    })
    .min(4, " must be at least 4")
    .max(25, " must be at most 25"),
});

export const CreateBathroomSchema = z.object({
  bathrooms: z.coerce
    .string({
      required_error: "bathrooms is required",
    })
    .min(1, "bathrooms must be at least 1")
    .max(25, "bathrooms must be at most 3")
    .refine((val) => !isNaN(Number(val)), {
      message: "bathrooms must be a valid number",
    }),
});
router.get("/unittype", checkToken, GetTypeUnit);
router.get("/unitbedroom", checkToken, GetBedroom);
router.get("/unitbathroom", checkToken, GetBathroom);

router.post(
  "/unittype",
  validateData(CreateTypeSchema),
  checkToken,
  CreateType
);
router.post("/unitbathroom", checkToken, CreateBathroom);
router.post("/unitbedroom", checkToken, CreateBedroom);
export default router;

import { Router } from "express";

import { checkToken } from "../../../routes/verify/verifyController.js";
import {
  CreateUnitFloor,
  CreateUnitNumber,
  GetFloor,
  GetUnitNumber,
} from "./unitTypeController.js";
import { validateData } from "../../../middlewares/validationMiddlewares.js";
import { z } from "zod";

const router = Router();

export const CreateUnitFloorSchema = z.object({
  floor: z.coerce
    .string({
      required_error: "unit_number is required",
    })
    .min(1, "unit_number must be at least 1")
    .max(3, "unit_number must be at most 3")
    .refine((val) => !isNaN(Number(val)), {
      message: "unit_number must be a valid number",
    }),
});

export const CreateUnitNumberSchema = z.object({
  unit_number: z.coerce
    .string({
      required_error: "unit_number is required",
    })
    .min(1, "unit_number must be at least 1")
    .max(3, "unit_number must be at most 3")
    .refine((val) => !isNaN(Number(val)), {
      message: "unit_number must be a valid number",
    }),
});

router.get("/unitnumber", checkToken, GetUnitNumber);
router.get("/unitfloor", checkToken, GetFloor);
// router.get("/", checkToken, GetBathroom);

router.post(
  "/unitnumber",
  checkToken,
  validateData(CreateUnitNumberSchema),

  CreateUnitNumber
);
router.post(
  "/unitfloor",
  checkToken,

  validateData(CreateUnitFloorSchema),
  CreateUnitFloor
);
// router.post("/", checkToken, CreateBedroom);
export default router;

import { Router } from "express";
import { checkToken } from "../verify/verifyController.js";
import { CreateUnit, GetUnit } from "./unitController.js";
import { z } from "zod";
import { validateData } from "../../middlewares/validationMiddlewares.js";

const router = Router();

export const CreateUnitSchema = z.object({
  unit_number: z.coerce
    .string({
      required_error: " is required",
    })
    .min(1, " must be at least 1")
    .max(3, " must be at most 3")
    .refine((val) => !isNaN(Number(val)), {
      message: " must be a valid number",
    }),
  floor: z.coerce
    .string({
      required_error: " is required",
    })
    .min(1, " must be at least 1")
    .max(3, " must be at most 3")
    .refine((val) => !isNaN(Number(val)), {
      message: " must be a valid number",
    }),
  bedrooms: z.coerce
    .string({
      required_error: " is required",
    })
    .min(1, " must be at least 1")
    .max(3, " must be at most 3")
    .refine((val) => !isNaN(Number(val)), {
      message: " must be a valid number",
    }),
  bathrooms: z.coerce
    .string({
      required_error: " is required",
    })
    .min(1, " must be at least 1")
    .max(3, " must be at most 3")
    .refine((val) => !isNaN(Number(val)), {
      message: " must be a valid number",
    }),
  status: z.string({ message: " is required" }).min(1).max(30),
  price: z.coerce
    .string({
      required_error: " is required",
    })
    .min(4, " must be at least 1")
    .max(10, " must be at most 3")
    .refine((val) => !isNaN(Number(val)), {
      message: " must be a valid number",
    }),
  file: z.string({ message: " is required" }).min(1).nonempty(),
  type: z.string({ message: " is required" }).min(1).max(30),
});
router.get("/", checkToken, GetUnit);
router.post(
  "/register",
  validateData(CreateUnitSchema),
  checkToken,
  CreateUnit
);

export default router;

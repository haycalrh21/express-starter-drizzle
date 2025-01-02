import { Router } from "express";
import { CreateCustomer, GetCustomers } from "./customerController.js";

import { checkToken } from "../verify/verifyController.js";

const router = Router();
router.post("/register", checkToken, CreateCustomer);
router.get("/", checkToken, GetCustomers);
export default router;

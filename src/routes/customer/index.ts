import { Router } from "express";
import { CreateCustomer, GetCustomers } from "./customerController.js";

const router = Router();
router.post("/register", CreateCustomer);
router.get("/", GetCustomers);
export default router;

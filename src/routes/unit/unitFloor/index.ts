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
const router = Router();

router.get("/unittype", checkToken, GetTypeUnit);
router.get("/unitbedroom", checkToken, GetBedroom);
router.get("/unitbathroom", checkToken, GetBathroom);

router.post("/unittype", checkToken, CreateType);
router.post("/unitbathroom", checkToken, CreateBathroom);
router.post("/unitbedroom", checkToken, CreateBedroom);
export default router;

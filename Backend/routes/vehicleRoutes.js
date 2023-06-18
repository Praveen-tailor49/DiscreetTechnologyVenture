import express from "express";
import {
  addVehicle, getVehicle, updateVehicle, deleteVehicle
} from "../controller/vehicleController.js";
const router = express.Router();


router.post("/addvehicle", addVehicle);
router.get("/getvehicle", getVehicle);
router.post("/updatevehicle", updateVehicle);
router.post("/deleteVehicle", deleteVehicle);


export default router;

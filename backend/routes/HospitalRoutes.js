import express from "express";
import {
  getAllHospitals,
  createHospital,
  deleteHospital,
  updateHospital,
  addOrUpdateHospitalDetails,
} from "../controllers/hospitalController.js";

const router = express.Router();

router.get("/", getAllHospitals);
router.post("/", createHospital);
router.delete("/:id", deleteHospital); // Include ID in the URL
router.put("/:id", updateHospital); // Include ID in the URL
router.post("/:id/details", addOrUpdateHospitalDetails); // Include ID in the URL

export default router;
import express from "express";
import { createAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.route("/create").post(createAppointment);

export default router;

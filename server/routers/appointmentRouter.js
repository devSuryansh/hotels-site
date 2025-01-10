import express from "express"; // Importing express framework
import { createAppointment } from "../controllers/appointmentController.js"; // Importing the createAppointment controller function

const router = express.Router(); // Creating a new router instance

// Defining a route for creating an appointment
router.route("/create").post(createAppointment);

export default router; // Exporting the router to be used in other parts of the application

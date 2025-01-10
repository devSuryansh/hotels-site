import express from "express"; // Importing express framework
import {
  registerUser,
  loginUser,
  addAdmin,
} from "../controllers/userController.js"; // Importing user-related controller functions

const router = express.Router(); // Creating a new router instance

// Defining routes for user registration, login, and adding an admin
router.route("/register").post(registerUser); // Route for user registration
router.route("/login").post(loginUser); // Route for user login
router.route("/admin/add").post(addAdmin); // Route for adding an admin

export default router; // Exporting the router to be used in other parts of the application

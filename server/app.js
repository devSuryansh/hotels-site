import express from "express"; // Importing express framework
import { config } from "dotenv"; // Importing dotenv for environment variable management
import cors from "cors"; // Importing CORS for handling cross-origin requests
import cookieParser from "cookie-parser"; // Importing cookie-parser to parse cookies
import fileUpload from "express-fileupload"; // Importing express-fileupload for handling file uploads
import dbConnection from "./database/dbConnection.js"; // Importing database connection function
import appointmentRouter from "./routers/appointmentRouter.js"; // Importing appointment router
import { errorMiddleware } from "./middlewares/errorMiddleware.js"; // Importing error handling middleware
import userRouter from "./routers/userRouter.js"; // Importing user router
import hotelsRouter from "./routers/hotelsRouter.js"; // Importing hotels router

const app = express(); // Creating an instance of express
config({ path: ".env" }); // Configuring environment variables

// Setting up CORS to allow requests from specific origins
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies

// Middleware to handle file uploads with temporary file storage
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Setting up routers for different API endpoints
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/hotel", hotelsRouter);

dbConnection(); // Establishing database connection

app.use(errorMiddleware); // Using custom error handling middleware

export default app; // Exporting the app instance

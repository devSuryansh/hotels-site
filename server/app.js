import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import appointmentRouter from "./routers/appointmentRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./routers/userRouter.js";

const app = express();
config({ path: ".env" });

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/user", userRouter);
dbConnection();

app.use(errorMiddleware);

export default app;

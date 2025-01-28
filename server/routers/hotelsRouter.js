import { Router } from "express";
import { addHotel, getHotels } from "../controllers/hotelsController.js";

const router = Router();

router.route("/add").post(addHotel);
router.route("/get").get(getHotels);

export default router;

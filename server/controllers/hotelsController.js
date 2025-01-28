import { Hotel } from "../models/hotelsSchema.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const addHotel = catchAsyncError(async (req, res, next) => {
  const {
    name,
    location,
    numberOfRooms,
    description,
    rating,
    price,
    services,
    facilities,
    hotelImages,
    url,
  } = req.body;

  if (
    !name ||
    !location ||
    !numberOfRooms ||
    !description ||
    !rating ||
    !price ||
    !services ||
    !facilities ||
    !hotelImages ||
    !url
  ) {
    return next(new ErrorHandler("Please fill all the required fields", 400));
  }

  await Hotel.create({
    name,
    location,
    numberOfRooms,
    description,
    rating,
    price,
    services,
    facilities,
    hotelImages,
    url,
  });

  res.status(200).json({
    success: true,
    message: "Hotel added successfully",
  });
});

export const getHotels = catchAsyncError(async (req, res, next) => {
  const hotels = await Hotel.find();

  res.status(200).json({
    success: true,
    hotels,
  });
});

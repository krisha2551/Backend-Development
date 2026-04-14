import express from "express";
import bookingController from "../controllers/bookingController.js";
import auth from "../middleware/auth.js";


const router = express.Router();


// CREATE BOOKING
router.post(
  "/create",
  auth,
  bookingController.createBooking
);


// GET ALL BOOKINGS
router.get(
  "/all",
  auth,
  bookingController.getAllBooking
);


// GET BOOKINGS BY SERVICE ID
router.get(
  "/service/:id",
  auth,
  bookingController.getAllService
);


// GET BOOKINGS BY CATEGORY ID
router.get(
  "/category/:id",
  auth,
  bookingController.getAllBookingByCategory
);


// GET BOOKINGS BY USER ID
router.get(
  "/user/:id",
  auth,
  bookingController.getAllBookingByUser
);



export default router;
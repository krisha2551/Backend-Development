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


// GET own bookings (customer)
router.get(
  "/user",
   auth, 
   bookingController.getBookingsByUserId);


// GET BOOKINGS BY SERVICE ID
router.get(
  "/service/:id",
  auth,
  bookingController.getAllService
);


// GET BOOKING BY ID
router.get(
  "/:id",
  auth,
  bookingController.getBookingById
);


// GET bookings by userId (admin)
router.get(
  "/user/:id", 
  auth, 
  bookingController.getBookingsByUserId
);


// CANCEL
router.patch(
  "/cancel/:id", 
  auth, 
  bookingController.cancelBooking
);

export default router;
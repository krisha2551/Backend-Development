import express from "express";
import bookingController from "../controllers/bookingController.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.post(
    "/create", 
    auth, 
    bookingController.createBooking
);


export default router;
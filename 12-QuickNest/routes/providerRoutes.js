import express from "express";
import providerController from "../controllers/providerController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";


const router = express.Router();

// Register Provider
router.post(
  "/register",
  auth,
  providerController.registerAsProvider
);


// Get Providers (Admin, Super Admin)
router.get(
  "/getProvider",
  auth,
  checkRole("admin", "super_admin"),
  providerController.getProvider
);


// Provider can get own bookings
router.get(
  "/getBookingProvider",
  auth,
  checkRole("provider"),
  providerController.getProviderBooking
);


// Admin can get bookings by provider id
router.get(
  "/getBookingProvider/:id",
  auth,
  checkRole("admin", "super_admin"),
  providerController.getProviderBooking
);




export default router;
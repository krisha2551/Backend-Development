import Provider from "../models/Provider.js";
import Booking from "../models/Booking.js"
import Service from "../models/Service.js";
import User from "../models/User.js";

import HttpError from "../middleware/HttpError.js";

import sendEmail from "../utils/sendEmail.js";
import {getProviderRegistrationEmailTemplate}  from "../services/emailTemplate.js";


const registerAsProvider = async (req, res, next) => {
  try {

    const userId = req.user._id;
    const { document, experience, services } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    const existingProvider = await Provider.findOne({ userId });

    if (existingProvider) {
      return next(
        new HttpError("You are already registered as a provider", 400)
      );
    }

    
    if (!services || !Array.isArray(services) || services.length === 0) {
      return next(new HttpError("At least one service is required", 400));
    }

    const validServices = await Service.find({
      _id: { $in: services },
    });

    if (validServices.length !== services.length) {
      return next(new HttpError("Invalid service IDs", 400));
    }

    
    const newProvider = new Provider({
      userId,
      document,
      experience,
      services,
    });

    await newProvider.save();

    await sendEmail({
      to: user.email,
      subject: "Provider Registration Received",
      html: getProviderRegistrationEmailTemplate(user.name)
    });

    res.status(201).json({
      success: true,
      message:
        "Registered as provider successfully. Wait for admin verification",
      provider: newProvider,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


const getProvider = async (req, res, next) => {
  try {

    const { isVerified } = req.query;

    let query = {};

    if (isVerified !== undefined) {
      query.isVerified = isVerified === "true";
    }

    const providers = await Provider.find(query)
      .populate({
        path: "userId",
        select: "name email phone",
      })
      .populate({
        path: "services",
        select: "name",
      });

    if (!providers.length) {
      return next(new HttpError("No providers found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Provider details fetched successfully",
      count: providers.length,
      providers,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// GET PROVIDER BOOKINGS
const getProviderBooking = async (req, res, next) => {
  try {

    const userId = req.params.id || req.user._id;

    const user = await Provider.findOne({ userId });

    const role = req.user.role;

    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    const bookings = await Booking.find({
      providerId: user._id
    });

    if (!bookings || bookings.length === 0) {
      return next(new HttpError("booking not found", 404));
    }

    // Provider can only see own bookings
    if (role === "provider") {

     if (bookings[0].providerId.toString() !== user._id.toString()) {
        return next(
          new HttpError("with this provider not access", 400)
        );
      }

    }

    res.status(200).json({
      success: true,
      message: "booking fetched successfully!!",
      bookings
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


export default { 
  registerAsProvider, 
  getProvider, 
  getProviderBooking
};



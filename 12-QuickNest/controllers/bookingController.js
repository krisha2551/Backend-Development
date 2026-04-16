import HttpError from "../middleware/HttpError.js";

import Service from "../models/Service.js";
import Booking from "../models/Booking.js";


// CREATE BOOKING
const createBooking = async (req, res, next) => {
  try {

    const { serviceId, bookingDate, timeSlot, notes } = req.body;

    const userId = req.user._id;

    const service = await Service.findById(serviceId);

     if (!service) {
      return next(new HttpError("Service not found", 404));
    }

    if (!service.isActive) {
      return next(
        new HttpError(
            "Service is currently not active, please try later", 
            400)
      );
    }

    const startOfDay = new Date(bookingDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(bookingDate);
    endOfDay.setHours(23, 59, 59, 999);


    const existingBooking = await Booking.findOne({
      serviceId,
      bookingDate: { $gte: startOfDay, $lt: endOfDay },
      timeSlot,
      status: { $in: ["pending", "confirmed"] },
    });

   
   if (existingBooking) {
      return next(
        new HttpError("Service already booked for this time slot ", 409),
      );
    }


    const newBooking = new Booking({
      userId,
      serviceId,
      bookingDate: new Date(bookingDate),
      timeSlot,
      notes,
      totalPrice: service.price,
    });


    await newBooking.save();

    await newBooking.populate([
      {
        path: "serviceId",
        select:"name price duration",
      },
      {
        path:"userId",
        select: "name email phone",
      },
    ]);

    // await newBooking.populate("serviceId");

    // await newBooking.populate("userId");


    res.status(201).json({
      success: true,
      message: "Service booked successfully",
      newBooking,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// GET ALL BOOKINGS
const getAllBooking = async (req, res, next) => {
  try {

    let bookings;
    let Role = req.user.role;

    if (Role === "admin" || Role === "super_admin") {
      bookings = await Booking.find({}).populate([
        {
          path: "serviceId",
          select: "name price duration",
        },
        {
          path: "userId",
          select: "name email phone",
        },
      ]);
    }
    else if (Role === "customer") {
      bookings = await Booking.find({ userId: req.user._id }).populate([
        {
          path: "serviceId",
          select: "name price duration",
        },
        {
          path: "userId",
          select: "name email phone",
        },
      ]);
    }
    else {
      return next(new HttpError("Unauthorized Access", 401));
    }

    if (bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bookings found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      bookings,
    });

  } catch (error) {
    next(new HttpError(error.message || "Failed to fetch bookings", 500));
  }
};


// GET ALL BOOKING BY SERVICE ID
const getAllService = async (req, res, next) => {
  try {

    let bookings;
    let Role = req.user.role;
    const serviceId = req.params.id;

    if (Role === "admin" || Role === "super_admin") {
      bookings = await Booking.find({  })
        .populate([
          {
            path: "serviceId",
            select: "name price duration description",
          },
          {
            path: "userId",
            select: "name email phone",
          },
        ]);
    } 
    
    else if (Role === "customer") {
      bookings = await Booking.find({
        userId: req.user._id,
        serviceId: serviceId,
      })
        .populate("serviceId", "name price duration description");
    } 
    
   else {
      return next(new HttpError("Unauthorized access", 401));
    }

    if (bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No booking data found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service bookings fetched successfully",
      bookings,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



// GET BOOKING BY ID
const getBookingById = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId).populate([
      {
        path: "serviceId",
        select: "name price duration description",
      },
      {
        path: "userId",
        select: "name email phone",
      },
    ]);

    if (!booking) {
      return next(new HttpError("Booking not found", 404));
    }

    if (
      req.user.role === "customer" &&
      booking.userId._id.toString() !== req.user._id.toString()
    ) {
      return next(new HttpError("unAuthorized access", 401));
    }

    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      booking,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// GET BOOKINGS (Admin → any user | Customer → own only)
const getBookingsByUserId = async (req, res, next) => {
  try {

    const requestedUserId = req.params.id || req.user._id;

    let bookings;

    bookings = await Booking.find({ userId: requestedUserId });

    if (!bookings.length) {
      return next(new HttpError("No booking data found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Booking data fetched successfully",
      bookings,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// const getBookingsByUserId = async (req, res, next) => {
//   try{
    
//     let booking;

//     let loginUser = req.user._id;

//     let userId = req.params.id;

//     if (loginUser) {
//       booking = await Booking.find({ userId: loginUser });
//     }

//     if (userId) {
//       booking = await Booking.find({ userId });
//     }

//     if (!booking.length) {
//       return next(new HttpError("No booking data found", 404))
//     }

//     res.status(200).json({
//       success: true,
//       message: "Booking data fetched successfully",
//       booking,
//     })
//   }catch(error){
//     next(new HttpError(error.message, 500));
//   }
// };



// AVAILABLE TIME SLOTS
const availableTimeSlots = async (req, res, next) => {

 try{

   const { serviceId, bookingDate } = req.query

    const service = await Service.findById(serviceId)

    if (!service) {
      return next(new HttpError("Service not found", 404));
    }

    const startOfDay = new Date(bookingDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(bookingDate);
    endOfDay.setHours(23, 59, 59, 999);


    const bookings = await Booking.find({
      serviceId,
      bookingDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: { 
        $in: ["pending", "confirmed"] 
      },
    });

    const bookedSlots = bookings.map((b) => b.timeSlot);

    const allTimeSlots = [
        "09:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 01:00 PM",
        "02:00 PM - 03:00 PM",
        "03:00 PM - 04:00 PM",
        "04:00 PM - 05:00 PM",
        "05:00 PM - 06:00 PM"
      ]

    const availableTimeSlots = allTimeSlots.filter(
      (slot) => !bookedSlots.includes(slot));

    
    res.status(200).json({
      success: true,
      message: availableTimeSlots.length
        ? "Available time slots fetched successfully"
        : "No available time slots",
      availableTimeSlots,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};






export default {
  createBooking,
  getAllBooking,
  getAllService,
  getBookingById, 
  getBookingsByUserId,
  availableTimeSlots,

};


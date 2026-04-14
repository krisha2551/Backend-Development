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
            "Service is currently not active please try again after some time", 
            400),
      );
    }

    const startOfDay = new Date(bookingDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(bookingDate);
    endOfDay.setHours(23, 59, 59, 999);


    const existingBooking = await Booking.findOne({
      serviceId,
      bookingDate: { $gte: startOfDay, $lt: endOfDay },
      status: { $in: ["pending", "confirmed"] },
    });

    console.log("service", existingBooking);


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
      return next(new HttpError("unAuthorized Access", 401));
    }

    if (bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Booking data not found",
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
      return next(new HttpError("unAuthorization access", 401));
    }

    if (bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Booking data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All booking service fetched successfully!!!!",
      bookings,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



// GET ALL BOOKINGS BY CATEGORY ID
const getAllBookingByCategory = async (req, res, next) => {
  try {
    let bookings;
    const Role = req.user.role;
    const categoryId = req.params.id;

    const services = await Service.find({ category: categoryId });
    

    if (Role === "admin" || Role === "super_admin") {
      bookings = await Booking.find({
        serviceId: serviceIds ,
      }).populate([
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

      bookings = await Booking.find({ userId }).populate([
        {
          path: "serviceId",
          select: "name price duration description",
        },
      ]);
    }  
    
    else {
      return next(new HttpError("unAuthorized Access", 401));
    }

    if (bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bookings found for this category",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bookings by category fetched successfully",
      bookings,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// GET ALL BOOKINGS BY USER ID
const getAllBookingByUser = async (req, res, next) => {
  try {
    let bookings;
    const Role = req.user.role;
    const userId = req.params.id;

    if (Role === "admin" || Role === "super_admin") {
      bookings = await Booking.find({ userId }).populate([
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
      bookings = await Booking.find({ userId }).populate([
        {
          path: "serviceId",
          select: "name price duration description",
        },
      ]);
    }
    else {
      return next(new HttpError("unAuthorized Access", 401));
    }

    if (bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bookings found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bookings by user fetched successfully",
      bookings,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


export default {
  createBooking,
  getAllBooking,
  getAllService,
  getAllBookingByCategory,
  getAllBookingByUser,
};


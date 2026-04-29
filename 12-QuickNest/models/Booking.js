import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String,
      enum: [
        "09:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 01:00 PM",
        "02:00 PM - 03:00 PM",
        "03:00 PM - 04:00 PM",
        "04:00 PM - 05:00 PM",
        "05:00 PM - 06:00 PM"
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      maxLength: 200, 
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    duration: {
      type: Number, 
      required: true,
      min: 1,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Category",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


const Service = mongoose.model("Service", serviceSchema);

export default Service;
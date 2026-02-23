import mongoose from "mongoose";

const linkedInProfileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    headline: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    about: {
      type: String,
    },

    skills: {
      type: String,
    },

    experience: {
      type: String,
    },

    education: {
      type: String,
    },

    profileImage: {
      type: String, 
    },
  },
  { timestamps: true }
);

const linkedInProfile =  mongoose.model("LinkedInProfile", linkedInProfileSchema);

export default linkedInProfile;
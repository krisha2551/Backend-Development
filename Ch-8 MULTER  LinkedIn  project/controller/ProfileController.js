import Profile from "../model/ProfileModel.js";
import HttpError from "../middleware/httpError.js";

export const createProfile = async (req, res, next) => {
  try {
    const { fullName, bio, headline } = req.body;

    const profileImage = req.files?.profileImage?.[0]?.path;
    const resume = req.files?.resume?.[0]?.path;
    const introVideo = req.files?.introVideo?.[0]?.path;
    const projectImages =
      req.files?.projectImage?.map((file) => file.path) || [];

    const newProfile = new Profile({
      fullName,
      bio,
      headline,
      profileImage,
      resume,
      introVideo,
      projectImages,
    });

    await newProfile.save();

    res.status(201).json({
      message: "Profile created successfully",
      data: newProfile,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};
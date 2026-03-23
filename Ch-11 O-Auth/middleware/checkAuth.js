import HttpError from "./HttpError.js";

const checkAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new HttpError("Unauthorized: Please login first", 401));
    }

    return next();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default checkAuth;
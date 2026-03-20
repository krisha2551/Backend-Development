import express from "express";
import HttpError from "../middleware/HttpError.js";

const router = express.Router();

// Middleware
const checkAuth = (req, res, next) => {
  if (!req.user) {
    return next(new HttpError("Unable to login", 401));
  }
  next();
};

// Profile route
router.get("/profile", checkAuth, (req, res) => {
  res.render("profile", { user: req.user });
});

export default router;
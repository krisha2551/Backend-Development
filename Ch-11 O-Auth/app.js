import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import session from "express-session";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import passport from "./config/passport.js";

const app = express();

// Middleware
app.use(express.json());

// EJS
app.set("view engine", "ejs");

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/", profileRoutes);

// Home
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// 404
app.use((req, res, next) => {
  next(new HttpError("Requested route not found", 404));
});

// Error handler
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error",
  });
});

// Start server
async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();   
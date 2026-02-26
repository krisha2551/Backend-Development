import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import HttpError from "./middleware/httpError.js";

// Load .env file
dotenv.config({ path: "./.env" });

// Check if env is working
console.log("PORT:", process.env.PORT);

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());


// Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to" });
});


// Undefined routes
app.use((req, res, next) => {
  next(new HttpError("Requested route not found", 404));
});


// middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});


const PORT = process.env.PORT || 5000;



const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();

export default app;
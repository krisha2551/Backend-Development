import express from "express";
import connectDB from "./db/mongoose.js";
import HttpError from "./middleware/httpError.js";
import profileRoutes from "./routes/ProfileRoutes.js";

const app = express();

app.use(express.json());


app.use("/profile", profileRoutes);


// Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to LinkedIn Profile" });
});

// Undefined routes
app.use((req, res, next) => {
  next(new HttpError("Requested route not found", 404));
});

// Error middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

const PORT = 5000;

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
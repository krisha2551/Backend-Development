import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";


// import Service from "./models/Service.js";
// import Category from "./models/Category.js";



const app = express();

app.use(express.json());


// Routes
app.use("/users", userRoutes);

app.use("/admin", adminRoutes);

app.use("/booking", bookingRoutes)



app.get("/", (req, res) => {
  res.json("Hello from server");
});


// 404 handler
app.use((req, res, next) => {
  next(new HttpError("Requested route not found", 404));
});


// Error middleware
app.use((error, req, res, next) => {

  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error",
  });
});


async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();



//relationship between service and category
// const check = async () => {
  //using manually
  // const service = await Service.findById("69d48aa2627ce6307336a653");

  // const category = await Category.findById(service.category);

  // console.log(category);

  //using populate

  //  const service = await Service.findById("69d48aa2627ce6307336a653").populate(
  //   "category","name -_id",
  // );

  // console.log(service);

  //using virtual finding the all service in category

//   const category = await Category.findById("69d33796f0f31525cbe41138").populate(
//     "services", "name description price -_id -category"
//   );

//   console.log(category.services);
// };

// check();
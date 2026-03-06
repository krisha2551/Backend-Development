import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
  },

  image: {
    type: String,
  },

  cloudinary_Id: {
    type: String,
  },

},

  { timestamps: true },

);

const Products = mongoose.model("Products", productSchema);

export default Products;
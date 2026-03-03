import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  productImage: {
    type: String,
    required: true,
  },
  cloudinary_Id: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model("Products", productSchema);

export default Products;
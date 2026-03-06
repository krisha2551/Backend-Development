import Product from "../model/Product.js";
import HttpError from "../middleware/httpError.js";
import cloudinary from "../config/cloudinary.js";


// CREATE PRODUCT
const createProduct = async (req, res, next) => {
  try {

    const { 
      name, 
      description, 
      price, 
      category 
    } = req.body;

    if (!req.file) {
      return next(new HttpError("Image is required", 400));
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      productImage: req.file.path,
      cloudinary_Id: req.file.filename,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};


// GET ALL PRODUCTS
const allProducts = async (req, res, next) => {
  try {
    
    const products = await Product.find({});

    if (products.length === 0) 
    {
      res.status(200).json({ message: "No product data found" });
    }

    res
      .status(200)
      .json({ message: "Product data fetched successfully", products });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



// GET SINGLE PRODUCT
const getProduct = async (req, res, next) => {
  try {

    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return next(new HttpError("Product not found", 404));
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};





export default {
  createProduct,
  allProducts,
  getProduct,

};
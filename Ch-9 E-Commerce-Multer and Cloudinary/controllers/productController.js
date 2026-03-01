import Product from "../model/Product.js";
import HttpError from "../middleware/httpError.js";

export const addProduct = async (req, res, next) => {
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
      imagePublicId: req.file.filename,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
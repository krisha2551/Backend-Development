import HttpError from "../middleware/HttpError.js";

import Category from "../models/Category.js";


// ADD 
const add = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const exist = await Category.findOne({ name });

    
    if (exist) {
      return next(new HttpError("Category already exists", 400));
    }

    const newCategory = {
      name,
      description,
    };

    const category = new Category(newCategory);

    await category.save();

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// GET ALL
const getAll = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// UPDATE
const update = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new HttpError("Category not found", 404));
    }

    Object.keys(req.body).forEach((key) => {
      category[key] = req.body[key];
    });

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// DELETE
const  deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new HttpError("Category not found", 404));
    }

    await Category.deleteOne({ _id: category._id });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


export default {
  add,
  getAll,
  update,
  deleteCategory ,
};
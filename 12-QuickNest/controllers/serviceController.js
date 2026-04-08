import Service from "../models/Service.js";
import Category from "../models/Category.js";

import HttpError from "../middleware/HttpError.js";


// ADD 
const add = async (req, res, next) => {
  try {
    const { name, price, duration, description, category } = req.body;

    const categoryExists = await Category.findById( category );

    if (!categoryExists) {
      return next(new HttpError("Category not found", 404));
    }

    const newService ={
      name,
      price,
      duration,
      description,
      category,
    };

    const service = new Service(newService);

     await service.save();

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



// GET ALL 
const getAll = async (req, res, next) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



// UPDATE 
const update = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return next(new HttpError("Service not found", 404));
    }

    Object.keys(req.body).forEach((key) => {
      service[key] = req.body[key];
    });

    await service.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



// DELETE 
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return next(new HttpError("Service not found", 404));
    }

    await Service.deleteOne({ _id: service._id });

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


export default {
  add,
  getAll,
  update,
  deleteService,
};
import StudentModel from "../model/StudentModel.js";

import HttpError from "../middleware/HttpError.js";

// CREATE STUDENT

const createStudent = async (req, res, next) => {
  try {

    const { 
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      course, 
      isActive 
    } = req.body;

    const newStudent = {
      firstName,
      lastName,
      email,
      phoneNumber,
      course,
      isActive,
    };

    const studentDetail = new StudentModel(newStudent);

    await studentDetail.save();

    res.status(201).json({
      message: "student detail saved",
      studentDetail,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
  
};



// GET ALL STUDENTS

const allStudent = async (req, res, next) => {
  try {

    const studentList = await StudentModel.find({});

    if (!studentList.length) {
      return next(new HttpError("no student data found", 404));
    }

    res.status(200).json({
      message: "student data received successfully",
      studentList,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }

};



// GET STUDENT BY ID

const studentById = async (req, res, next) => {
  try {

    const id = req.params.id;

    const student = await StudentModel.findById(id);

    if (!student) {
      return next(new HttpError("student not found with this id", 404));
    }

    res.status(200).json({
      message: "student found",
      student,
    });
  } catch (error) {
    next(new HttpError("invalid student id", 400));
  }

};



// PATCH UPDATE (Manual Field Validation)

const updateStudent = async (req, res, next) => {
  try {

    const id = req.params.id;

    const existingStudent = await StudentModel.findById(id);

    if (!existingStudent) {
      return next(new HttpError("student id not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "course",
      "isActive",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedUpdates.includes(field)
    );

    if (!isValidUpdates) {
      return next(
        new HttpError("only allowed fields can be updated", 400)
      );
    }

    updates.forEach((field) => {
      existingStudent[field] = req.body[field];
    });

    await existingStudent.save();

    res.status(200).json({
      message: "student data updated successfully",
      existingStudent,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }

};



// DELETE STUDENT

const deleteStudent = async (req, res, next) => {
  try {

    const id = req.params.id;

    const deletedStudent = await StudentModel.findByIdAndDelete(id);

    if (!deletedStudent) {
      return next(new HttpError("student not found", 404));
    }

    res.status(200).json({
      message: "student data deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }

};


export default {
  createStudent,
  allStudent,
  studentById,
  deleteStudent,
  updateStudent,
};
import Student from "../model/StudentModel.js";

import HttpError from "../middleware/httpError.js";

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

    const student = new Student({
      firstName,
      lastName,
      email,
      phoneNumber,
      course,
      isActive,
    });

    await student.save();

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new HttpError("Email already exists", 400));
    }
    next(new HttpError(error.message, 500));
  }
};

// GET ALL STUDENTS

const allStudent = async (req, res, next) => {
  try {

    const students = await Student.find({});

    if (!students || students.length === 0) {
      return next(new HttpError("No students found", 404));
    }

    res.status(200).json({
      message: "All students fetched successfully",
      students,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// GET STUDENT BY 

const StudentById = async (req, res, next) => {
  try {

    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return next(new HttpError("Student not found", 404));
    }

    res.status(200).json({
      message: "Student fetched successfully",
      student,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new HttpError("Invalid student ID", 400));
    }
    next(new HttpError(error.message, 500));
  }
};


// UPDATE STUDENT (PATCH)

const patchStudent = async (req, res, next) => {
  try {

    const { id } = req.params.id;

    const student = await Student.findByIdAndUpdate(
      id,
      req.body,
      { 
        new: true

      }
    );

    
  }
};



// DELETE STUDENT

const deleteStudent = async (req, res, next) => {
  try {

    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return next(new HttpError("Student not found", 404));
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student,
    });
  } catch (error) {
    
    if (error.name === "CastError") {
      return next(new HttpError("Invalid student ID", 400));
    }
    next(new HttpError(error.message, 500));
  }
};



export default {
  createStudent,
  allStudent,
  StudentById,
  deleteStudent,
};

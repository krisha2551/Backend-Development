import Student from "../model/StudentModel.js";

import HttpError from "../middleware/httpError.js";


const createStudent = async (req, res, next) => {
  try {

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      course,
      isActive,
    } = req.body;

    const student = new Student({
      firstName,
      lastName,
      email,
      phoneNumber,
      course,
      isActive,
    });

    const studentDetail = await new StudentModel(newStudent);

    await student.save();

    res.status(201).json({

      message: "Student created successfully",
      student,

    });

  } catch (error) {

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

export default {
  createStudent,
  allStudent,
};

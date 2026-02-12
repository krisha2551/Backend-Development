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

    const newStudent = {
      firstName,
      lastName,
      email,
      phoneNumber,
      course,
      isActive,
    };

    const StudentDetail = new Student(newStudent);

    await StudentDetail.save();

    res.status(201).json({
      message: "Student created successfully",
      data: newStudent,
    });
    
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default createStudent;

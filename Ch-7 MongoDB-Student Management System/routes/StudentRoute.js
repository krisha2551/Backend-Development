import express from "express";
import StudentController from "../controller/StudentController.js";

const router = express.Router();

// CREATE STUDENT
router.post("/", StudentController.createStudent);

// GET ALL STUDENTS
router.get("/allStudentData", StudentController.allStudent);

// GET STUDENT BY ID
router.get("/:id", StudentController.StudentById);

// UPDATE STUDENT (PATCH)  👈 ADD THIS
router.patch("/:id", StudentController.updateStudent);

// DELETE STUDENT
router.delete("/:id", StudentController.deleteStudent);


export default router;

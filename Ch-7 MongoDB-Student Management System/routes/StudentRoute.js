import express from "express";

import StudentController from "../controller/StudentController.js";

const router = express.Router();

router.post("/", StudentController.createStudent);

router.get("/allStudentData", StudentController.allStudent);



export default router;



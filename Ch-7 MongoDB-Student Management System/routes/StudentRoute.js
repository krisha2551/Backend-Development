import express from "express";

import createStudent from "../controller/StudentController.js";

const router = express.Router();

router.post("/", createStudent);


export default router;

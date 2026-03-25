import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// ADD USER
router.post("/add", userController.add);

// LOGIN USER
router.post("/login", userController.login);

export default router;
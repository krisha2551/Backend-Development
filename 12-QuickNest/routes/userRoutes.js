import express from "express";
import userController from "../controllers/userController.js";
import validate from "../middleware/validate.js";
import registerSchema from "../validation/registerSchema.js";

const router = express.Router();

// ADD USER
router.post("/add", validate(registerSchema), userController.add);

// LOGIN USER
router.post("/login", userController.login);

export default router;
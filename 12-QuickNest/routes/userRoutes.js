import express from "express";

import userController from "../controllers/userController.js";

import validate from "../middleware/validate.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import uploads from "../middleware/upload.js";

import {createUserSchema,updateUserSchema} from "../validation/UserSchema.js";


const router = express.Router();

// ADD USER
router.post(
  "/add", 
  uploads.single("profilePic"),
  validate(createUserSchema),
  userController.add);


// LOGIN USER
router.post("/login", userController.login);


// PROTECTED
router.get("/authLogin", auth, userController.authLogin);


router.post("/logOut", auth, userController.logOut);


router.post("/logOutAll", auth, userController.logOutAll);


router.get(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  userController.allUser,
);


router.patch(
  "/update",
  uploads.single("profilePic"),
  validate(updateUserSchema),
  auth,
  userController.update,
);


router.delete("/delete", auth, userController.deleteUser);

export default router;
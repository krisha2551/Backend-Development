import express from "express";
import upload from "../middleware/upload.js";
import { createProfile } from "../controller/ProfileController.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "projectImages", maxCount: 3 },
    { name: "introVideo", maxCount: 1 },
  ]),
  createProfile
);

export default router;
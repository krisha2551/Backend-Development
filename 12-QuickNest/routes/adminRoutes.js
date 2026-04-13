import express from "express";

import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";

import userController from "../controllers/userController.js";
import categoryController from "../controllers/categoryController.js";
import serviceController from "../controllers/serviceController.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validation/categorySchema.js";

import {
  createServiceSchema,
  updateServiceSchema,
} from "../validation/serviceSchema.js";

const router = express.Router();

// ================= USER =================

// GET ALL
router.get(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  userController.allUser
);


// UPDATE
router.patch(
  "/update/:id",
  auth,
  checkRole("admin", "super_admin"),
  userController.update
);


// DELETE
router.delete(
  "/delete/:id",
  auth,
  checkRole("admin", "super_admin"),
  userController.deleteUser
);



// ================= CATEGORY =================

// ADD 
router.post(
  "/category/add",
  auth,
  checkRole("admin", "super_admin"),
  validate(createCategorySchema),
  categoryController.add
);


// GET ALL 
router.get(
  "/category",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.getAll
);


// Get ALL ID BY  
router.get(
  "/category/:id",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.getById,
);


// UPDATE 
router.patch(
  "/category/update/:id",
  auth,
  checkRole("admin", "super_admin"),
  validate(updateCategorySchema),
  categoryController.update
);


// DELETE 
router.delete(
  "/category/delete/:id",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.deleteCategory
);



// ================= SERVICE =================

// ADD 
router.post(
  "/service/add",
  auth,
  checkRole("admin", "super_admin"),
  validate(createServiceSchema),
  serviceController.add
);


// GET ALL 
router.get(
  "/service",
  auth,
  checkRole("admin", "super_admin"),
  serviceController.getAll,
);


// Get ALL ID BY
router.get(
  "/service/:id",
  auth,
  checkRole("admin", "super_admin"),
  serviceController.getById,
);


// UPDATE 
router.patch(
  "/service/update/:id",
  auth,
  checkRole("admin", "super_admin"),
  validate(updateServiceSchema),
  serviceController.update
);


// DELETE 
router.delete(
  "/service/delete/:id",
  auth,
  checkRole("admin", "super_admin"),
  serviceController.deleteService
);




export default router;
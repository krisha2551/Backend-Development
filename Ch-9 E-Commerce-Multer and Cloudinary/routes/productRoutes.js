import express from "express";

import productsController from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();


// ADD PRODUCT
router.post("/add", upload.single("image"),  productsController.createProduct);

// GET ALL PRODUCTS
router.get("/allProducts", productsController.allProducts);

// GET SINGLE PRODUCT
router.get("/:id", productsController.getProduct);


export default router;
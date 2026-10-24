import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../controllers/productController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// ==========================================
// GET ALL PRODUCTS
// ==========================================
router.get("/products", getProducts);

// ==========================================
// CREATE PRODUCT
// ==========================================
router.post("/products", createProduct);

// ==========================================
// UPLOAD PRODUCT IMAGE
// ==========================================
router.post(
  "/upload-image",
  upload.single("image"),
  uploadProductImage
);

// ==========================================
// UPDATE PRODUCT
// ==========================================
router.put("/:id", updateProduct);

// ==========================================
// DELETE PRODUCT
// ==========================================
router.delete("/:id", deleteProduct);

// ==========================================
// GET SINGLE PRODUCT
// ==========================================
router.get("/:id", getProductById);

export default router;
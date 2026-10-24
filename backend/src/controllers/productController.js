import Product from "../models/Product.js";

import cloudinary from "../config/cloudinary.js";

// ==========================================
// GET ALL PRODUCTS
// ==========================================

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


// ==========================================
// GET SINGLE PRODUCT
// ==========================================

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.error("Get Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};


// ==========================================
// CREATE PRODUCT
// ADMIN ONLY
// ==========================================

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      oldPrice,
      category,
      image,
      sizes,
      colors,
      stock,
      featured,
      bestSeller,
    } = req.body;

    // Required fields
    if (
      !name ||
      !description ||
      price === undefined ||
      !category ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, description, price, category and image are required.",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      oldPrice: oldPrice || null,
      category,
      image,
      sizes: sizes || [],
      colors: colors || [],
      stock: stock || 0,
      featured: featured || false,
      bestSeller: bestSeller || false,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });

  } catch (error) {
    console.error("Create Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product.",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE PRODUCT
// ADMIN ONLY
// ==========================================

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const {
      name,
      description,
      price,
      oldPrice,
      category,
      image,
      sizes,
      colors,
      stock,
      featured,
      bestSeller,
    } = req.body;

    // Update only provided fields
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (oldPrice !== undefined) product.oldPrice = oldPrice;
    if (category !== undefined) product.category = category;
    if (image !== undefined) product.image = image;
    if (sizes !== undefined) product.sizes = sizes;
    if (colors !== undefined) product.colors = colors;
    if (stock !== undefined) product.stock = stock;
    if (featured !== undefined) product.featured = featured;
    if (bestSeller !== undefined) product.bestSeller = bestSeller;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });

  } catch (error) {
    console.error("Update Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update product.",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE PRODUCT
// ADMIN ONLY
// ==========================================

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product.",
      error: error.message,
    });
  }
};

// UPLOAD PRODUCT IMAGE
export const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image.",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "sigma-wears/products",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Image Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload image.",
      error: error.message,
    });
  }
};
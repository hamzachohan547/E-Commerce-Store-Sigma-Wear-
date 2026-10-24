import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Prime Athletic Short",
    description:
      "Premium athletic shorts designed for comfort and everyday performance.",
    price: 8500,
    oldPrice: 10000,
    category: "shorts",
    image: "/images/product1.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    stock: 25,
    featured: true,
    bestSeller: true,
  },

  {
    name: "Essential Oversized Tee",
    description:
      "Comfortable oversized t-shirt with a clean modern look.",
    price: 5500,
    oldPrice: 6500,
    category: "t-shirts",
    image: "/images/product2.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Grey"],
    stock: 40,
    featured: true,
    bestSeller: false,
  },

  {
    name: "Premium Casual Shirt",
    description:
      "A premium casual shirt suitable for everyday and smart casual wear.",
    price: 7200,
    oldPrice: 8500,
    category: "shirts",
    image: "/images/product3.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    stock: 20,
    featured: true,
    bestSeller: true,
  },

  {
    name: "Urban Relaxed Pants",
    description:
      "Relaxed-fit pants combining comfort with contemporary streetwear style.",
    price: 9000,
    oldPrice: 10500,
    category: "pants",
    image: "/images/product4.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Beige"],
    stock: 18,
    featured: false,
    bestSeller: true,
  },

  {
    name: "Classic Black Tee",
    description:
      "A timeless black t-shirt made for everyday outfits.",
    price: 4500,
    oldPrice: 5500,
    category: "t-shirts",
    image: "/images/product5.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    stock: 50,
    featured: false,
    bestSeller: true,
  },

  {
    name: "Signature Hoodie",
    description:
      "Premium hoodie with a relaxed fit and soft comfortable fabric.",
    price: 9500,
    oldPrice: 11000,
    category: "hoodies",
    image: "/images/product6.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Grey"],
    stock: 30,
    featured: true,
    bestSeller: true,
  },

  {
    name: "Relaxed Fit Jeans",
    description:
      "Modern relaxed-fit jeans designed for everyday comfort.",
    price: 10500,
    oldPrice: 12000,
    category: "jeans",
    image: "/images/product7.jpg",
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue", "Black"],
    stock: 22,
    featured: false,
    bestSeller: true,
  },

  {
    name: "Everyday Overshirt",
    description:
      "Versatile overshirt that works perfectly with casual everyday outfits.",
    price: 7800,
    oldPrice: 9000,
    category: "shirts",
    image: "/images/product8.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    stock: 15,
    featured: true,
    bestSeller: false,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
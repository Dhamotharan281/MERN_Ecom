import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();

const products = [
  {
    name: "Classic Oxford Button-Down Shirt",
    description: "This classic Oxford shirt is tailored for a polished yet casual look. Crafted from high-quality cotton.",
    price: 39.99,
    discountPrice: 34.99,
    countInStock: 20,
    sku: "OX-SH-001",
    category: "Top Wear",
    brand: "Urban Threads",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Blue", "Yellow"],
    collections: "Business Casual",
    material: "Cotton",
    gender: "Men",
    images: [
      { url: "https://picsum.photos/500/500?random=39", altText: "Classic Oxford Shirt" },
      { url: "https://picsum.photos/500/500?random=40", altText: "Classic Oxford Shirt Back" },
    ],
    rating: 4.5,
    numReviews: 12,
    isFeatured: true,
    tags: ["shirt", "formal", "cotton", "men"],
  },
  {
    name: "Slim-Fit Stretch Shirt",
    description: "A versatile slim-fit shirt perfect for business or evening events.",
    price: 29.99,
    discountPrice: 24.99,
    countInStock: 35,
    sku: "SLIM-SH-002",
    category: "Top Wear",
    brand: "Modern Fit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy Blue", "Burgundy"],
    collections: "Formal Wear",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      { url: "https://picsum.photos/500/500?random=41", altText: "Slim-Fit Shirt" },
    ],
    rating: 4.8,
    numReviews: 15,
    isFeatured: true,
    tags: ["shirt", "slim-fit", "formal"],
  },
  {
    name: "Slim Fit Joggers",
    description: "Slim-fit joggers with an elasticated drawstring waist. Features ribbed hems and side pockets.",
    price: 40,
    discountPrice: 35,
    countInStock: 20,
    sku: "BW-001",
    category: "Bottom Wear",
    brand: "ActiveWear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Navy"],
    collections: "Casual Collection",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      { url: "https://picsum.photos/500/500?random=9", altText: "Slim Fit Joggers" },
    ],
    rating: 4.5,
    numReviews: 12,
    tags: ["joggers", "casual", "men"],
  },
  {
    name: "High-Waist Skinny Jeans",
    description: "High-waist skinny jeans in stretch denim with a button and zip fly.",
    price: 50,
    discountPrice: 45,
    countInStock: 30,
    sku: "BW-W-001",
    category: "Bottom Wear",
    brand: "DenimStyle",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Dark Blue", "Black", "Light Blue"],
    collections: "Denim Collection",
    material: "Denim",
    gender: "Women",
    images: [
      { url: "https://picsum.photos/500/500?random=19", altText: "High-Waist Skinny Jeans" },
    ],
    rating: 4.8,
    numReviews: 20,
    isFeatured: true,
    tags: ["jeans", "denim", "women"],
  },
  {
    name: "Knitted Cropped Top",
    description: "A stylish knitted cropped top with a flattering fitted silhouette.",
    price: 40,
    discountPrice: 35,
    countInStock: 25,
    sku: "TW-W-001",
    category: "Top Wear",
    brand: "ChicKnit",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "White"],
    collections: "Knits Collection",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      { url: "https://picsum.photos/500/500?random=29", altText: "Knitted Cropped Top" },
    ],
    rating: 4.6,
    numReviews: 15,
    isFeatured: true,
    tags: ["top", "knit", "women", "crop"],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();

    console.log("✅ Data Destroyed");

    await Product.insertMany(products);

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@ecommerce.com",
      password: "admin123",
      role: "ADMIN",
    });

    console.log("✅ Admin User Created");
    console.log("Email: admin@ecommerce.com");
    console.log("Password: admin123");

    console.log("✅ Data Imported");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

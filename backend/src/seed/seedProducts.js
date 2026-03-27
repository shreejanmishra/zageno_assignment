const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config({ path: require("path").resolve(__dirname, "../../.env") });

const products = [
  {
    name: "Razer Blackshark V2 X Headphones",
    description:
      "Razer Blackshark V2 X - Gaming Wired Headphones On Ear Headphones with Mic Black",
    price: 4999,
    image: "https://m.media-amazon.com/images/I/51tOeVMnkfL._SL1001_.jpg",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "ASTRIDE Ergofit Ergonomic Office Chair",
    description:
      "ASTRIDE Ergofit Ergonomic Office Chair for Home | 3-Years Warranty | 2D Headrest, Adjustable Arms & Lumbar Support | Tilt Lock Mechanism [Heavy Duty Chromium Metal Base, Grey-White]",
    price: 5499,
    image: "https://m.media-amazon.com/images/I/818hqgJuNoL._SL1500_.jpg",
    category: "Furniture",
    stock: 50,
  },
  {
    name: "Stainless Steel Water Bottle",
    description:
      "Milton Duo DLX 1000 Thermosteel 24 Hours Hot and Cold Water Bottle, 1 Litre, Silver",
    price: 999,
    image: "https://m.media-amazon.com/images/I/518vfYI5WJL._SL1500_.jpg",
    category: "Kitchen",
    stock: 40,
  },
  {
    name: "Mechanical Gaming Keyboard",
    description:
      "Razer BlackWidow V3 - Black - Mechanical Gaming Keyboard with Razer Chroma RGB - Green Switch - RZ03-03540100-R3M1",
    price: 7999,
    image: "https://m.media-amazon.com/images/I/718K1nCtvjL._SL1500_.jpg",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Sports Shoes",
    description:
      "Reebok Men's Running Shoes - Stride Runner - Lightweight Training Shoes for Gym, Running and Fitness",
    price: 2499,
    image: "https://m.media-amazon.com/images/I/71r4UTIJVEL._SY695_.jpg",
    category: "Clothing",
    stock: 30,
  },
  {
    name: "Corsair Dominator Titanium RGB DDR5 64GB",
    description:
      "CORSAIR Dominator Titanium RGB DDR5 64GB (2x32GB) DDR5 6000MHz CL30 AMD Expo Intel XMP iCUE Compatible Computer Memory – Grey (CMP64GX5M2B6000Z30)",
    price: 124999,
    image: "https://m.media-amazon.com/images/I/61ObybWVj-L._SL1500_.jpg",
    category: "Electronics",
    stock: 18,
  },
  {
    name: "Yoga Mat Premium",
    description:
      "Lifelong Yoga Mat for Men & Women | 5mm Thick TPE Cushioning | Non-Toxic & Sweat-Resistant | Lightweight & Portable with Carry Bag | Home & Studio Workout Mat | Made in India (Maroon)",
    price: 599,
    image: "https://m.media-amazon.com/images/I/71mInNZP1UL._SL1500_.jpg",
    category: "Sports",
    stock: 22,
  },
  {
    name: "Smart LED Desk Lamp",
    description:
      "Toreto London Smart LED Desk Lamp with Digital Clock, 45-Min Timer, 3 Light Modes, Detachable Pen Holder, Touch Control, Type-C Charging, ABS Body (White)",
    price: 749,
    image: "https://m.media-amazon.com/images/I/41z8Lh8ms5L._SL1000_.jpg",
    category: "Home & Kitchen",
    stock: 28,
  },
  {
    name: "Portable Bluetooth Speaker",
    description:
      "Waterproof portable speaker with 360° sound, 12-hour battery life, and built-in microphone for hands-free calls. IPX7 rated.",
    price: 1999,
    image:
      "https://www.mivi.in/cdn/shop/files/R18_copy.webp?v=1754117160&width=2500&format=webp&quality=100",
    category: "Electronics",
    stock: 32,
  },
  {
    name: "Bamboo Cutting Board Set",
    description:
      "Set of 4 premium knifes and a wooden cutting board in different sizes. Knife-friendly surface with juice grooves and easy-grip handles.",
    price: 373,
    image: "https://m.media-amazon.com/images/I/71ZZ0fPkDIL.jpg",
    category: "Home & Kitchen",
    stock: 45,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seeding...");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    const created = await Product.insertMany(products);
    console.log(`Seeded ${created.length} products successfully`);

    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedProducts();

const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

// @desc    Create a new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item" });
    }

    // 1. Verify all items have enough stock
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.name}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${product.name}. Available: ${product.stock}` 
        });
      }
    }

    // 2. Create the order
    const order = await Order.create({ items, totalAmount });

    // 3. Decrement stock for all items
    for (const item of items) {
      console.log(`Decrementing stock for ${item.product} by ${item.quantity}`);
      const productToUpdate = await Product.findById(item.product);
      if (productToUpdate) {
        productToUpdate.stock -= Number(item.quantity);
        await productToUpdate.save();
        console.log(`Updated product stock to: ${productToUpdate.stock}`);
      }
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createOrder, getOrders };

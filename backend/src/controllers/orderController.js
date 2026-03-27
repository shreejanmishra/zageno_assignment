const Order = require("../models/Order");

// @desc    Create a new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item" });
    }

    const order = await Order.create({ items, totalAmount });
    res.status(201).json(order);
  } catch (error) {
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

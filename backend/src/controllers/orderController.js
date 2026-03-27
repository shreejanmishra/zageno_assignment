const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Optional: Zod validation (gracefully degrade if not installed)
let z;
try {
  z = require("zod").z;
} catch {
  console.warn("[WARN] zod not installed. Skipping request validation.");
}

// Zod Schema for Order Validation (only if zod is available)
const orderSchema = z
  ? z.object({
      items: z
        .array(
          z.object({
            product: z.string().length(24, "Invalid Product ID"),
            name: z.string().min(1),
            price: z.number().min(0),
            quantity: z.number().int().min(1),
            image: z.string(),
          }),
        )
        .min(1, "Order must have at least one item"),
      totalAmount: z.number().min(0),
    })
  : null;

// @desc    Create a new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  let items, totalAmount;

  // Validate incoming payload with Zod (if available)
  if (orderSchema) {
    const validationResult = orderSchema.safeParse(req.body);
    if (!validationResult.success) {
      console.error("Zod Validation Failed:", JSON.stringify(validationResult.error.format(), null, 2));
      console.error("Received Body:", JSON.stringify(req.body, null, 2));
      return res.status(400).json({
        message: "Invalid request payload",
        errors: validationResult.error.format(),
      });
    }
    items = validationResult.data.items;
    totalAmount = validationResult.data.totalAmount;
  } else {
    // Fallback if Zod is not installed
    items = req.body.items;
    totalAmount = req.body.totalAmount;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item" });
    }
  }

  console.log(`\n[API Logger] INCOMING POST /api/orders payload received. Items length: ${items.length}`);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Verify all items have enough stock efficiently (still individual finds, but locked)
    // For large scale, we should aggregate check, but since we lock, we can keep the logic
    for (const item of items) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        throw new Error(`Product not found: ${item.name}`); // Throw to trigger catch/abort
      }
      if (product.stock < item.quantity) {
        throw new Error(
          `Not enough stock for ${product.name}. Available: ${product.stock}`,
        );
      }
    }

    // 2. Create the order
    const orderItems = await Order.create([{ items, totalAmount }], {
      session,
    });
    const order = orderItems[0]; // create with session returns array limit 1

    // 3. Decrement stock for all items using atomic bulkWrite
    const bulkOps = items.map((item) => {
      console.log(
        `[Transaction] Queuing stock decrement for ${item.name} (-${item.quantity})`,
      );
      return {
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { stock: -Number(item.quantity) } },
        },
      };
    });

    await Product.bulkWrite(bulkOps, { session });

    // Commit Transaction
    await session.commitTransaction();
    session.endSession();

    console.log(
      `[Success] Processed Order ${order._id} for ${items.length} items. Total: $${totalAmount}`,
    );

    res.status(201).json(order);
  } catch (error) {
    // Abort Transaction safely reverts order creation and stock modifications
    await session.abortTransaction();
    session.endSession();

    console.error("Order creation error (Transaction aborted):", error);

    // Distinguish 400 Bad Request (Stock issue) vs 500 Server Error
    if (
      error.message.includes("Not enough stock") ||
      error.message.includes("Product not found")
    ) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
const getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      Order.find().sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Order.countDocuments(),
    ]);

    res.json({
      orders,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalOrders: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createOrder, getOrders };

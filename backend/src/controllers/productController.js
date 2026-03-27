const Product = require("../models/Product");

// Optional: node-cache (gracefully degrade if not installed)
let NodeCache, myCache;
try {
  NodeCache = require("node-cache");
  myCache = new NodeCache({ stdTTL: 3600 });
} catch {
  console.warn("[WARN] node-cache not installed. Skipping caching.");
}

// @desc    Get all products (with optional search & category filter)
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 12 } = req.query;
    let filter = {};

    // Use fast Text Search instead of slow $regex if search is provided
    if (search) {
      filter.$text = { $search: search };
    }

    if (category) {
      filter.category = category;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      // Execute query with skip/limit and sort
      Product.find(filter)
        .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      
      // Count total documents matching filter
      Product.countDocuments(filter)
    ]);

    res.json({
      products,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalProducts: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all unique categories
// @route   GET /api/products/categories
const getCategories = async (req, res) => {
  try {
    if (myCache) {
      const cacheKey = "all_categories";
      const cachedCategories = myCache.get(cacheKey);
      if (cachedCategories) {
        return res.json(cachedCategories);
      }

      const categories = await Product.distinct("category");
      myCache.set(cacheKey, categories);
      return res.json(categories);
    }

    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getProducts, getProductById, getCategories };

const mongoose = require("mongoose");
const Product = require("./src/models/Product");

async function checkDb() {
  await mongoose.connect("mongodb+srv://shrmiswork_db_user:0PPfOcq9P1pqpYoS@test.tftp5vy.mongodb.net/");
  console.log("Connected to MongoDB for direct check");

  const products = await Product.find({});
  console.log(`Found ${products.length} products`);
  
  if (products.length > 0) {
    const p = products[0];
    console.log("Sample product format:");
    console.log(`_id type: ${typeof p._id}, value: ${p._id}`);
    console.log(`stock type: ${typeof p.stock}, value: ${p.stock}`);
    
    // Try updating manually to see if Mongoose throws validation errors
    try {
      console.log("Attempting manual update...");
      const updated = await Product.findByIdAndUpdate(
        p._id,
        { $inc: { stock: -1 } },
        { new: true, runValidators: true }
      );
      console.log("Manual update result:", updated?.stock);
    } catch (e) {
      console.error("Manual update error:", e);
    }
  }

  process.exit(0);
}

checkDb();

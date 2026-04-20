async function testStockDecrement() {
  const API_URL = "http://localhost:5000/api";

  try {
    // 1. Get products to find an item with stock > 0
    console.log("Fetching products...");
    const productsRes = await fetch(`${API_URL}/products`);
    const products = await productsRes.json();
    
    const testItem = products.find(p => p.stock > 0);
    
    if (!testItem) {
      console.log("No products with stock available to test.");
      return;
    }

    const initialStock = testItem.stock;
    const orderQuantity = 1;
    console.log(`\nTesting stock decrement for ${testItem.name}`);
    console.log(`Initial Stock: ${initialStock}`);

    // 2. Create an order for 1 qty of this item
    console.log("\nPlacing order...");
    const orderPayload = {
      items: [
        {
          product: testItem._id,
          name: testItem.name,
          price: testItem.price,
          image: testItem.image,
          quantity: orderQuantity
        }
      ],
      totalAmount: testItem.price * orderQuantity
    };
    console.log("Order Payload:", JSON.stringify(orderPayload, null, 2));

    const orderRes = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    
    const orderData = await orderRes.json();
    if (!orderRes.ok) throw new Error(orderData.message || "Failed to place order");
    console.log(`Order created successfully: ${orderData._id}`);

    // Let's add an explicit fetch to get the current product state from the DB, not the cached cache
    const checkProductRes = await fetch(`${API_URL}/products/${testItem._id}`);
    const checkProduct = await checkProductRes.json();
    console.log(`\nVerifying new stock from fresh request payload...`);
    console.log(`DB Stock: ${checkProduct.stock}`);

    // Wait 2 seconds to ensure operations complete on DB
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 3. Fetch the product again to verify stock decremented
    console.log("\nVerifying new stock again after 2 seconds...");
    const updatedProductRes = await fetch(`${API_URL}/products/${testItem._id}`);
    const updatedProduct = await updatedProductRes.json();
    const finalStock = updatedProduct.stock;
    console.log(`Final Stock: ${finalStock}`);

    if (finalStock === initialStock - orderQuantity) {
      console.log("\n✅ SUCCESS: Stock was correctly decremented!");
    } else {
      console.log(`\n❌ FAILED: Expected ${initialStock - orderQuantity}, but got ${finalStock}`);
    }

  } catch (error) {
    console.error("\n❌ Error during test:", error.message);
  }
}

testStockDecrement();

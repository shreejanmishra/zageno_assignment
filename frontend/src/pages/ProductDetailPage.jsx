import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import useCartStore from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";
import QuantitySelector from "../components/QuantitySelector";
import Loader from "../components/Loader";

function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-lg">Failed to load product</p>
        <Link
          to="/"
          className="mt-4 inline-block text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 
                   transition-colors mb-6"
      >
        ← Back to products
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              width={600}
              height={600}
            />
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <span className="text-sm font-medium text-indigo-600 uppercase tracking-wider">
              {product.category}
            </span>

            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed flex-1">
              {product.description}
            </p>

            <div className="mt-6 pt-6 border-t border-gray-100">
              {product.stock > 0 ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <QuantitySelector
                      quantity={quantity}
                      onChange={setQuantity}
                      max={product.stock}
                    />
                    <span className="text-sm text-gray-400">
                      ({product.stock} available)
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3 px-6 rounded-xl text-white font-medium text-base
                               transition-all duration-200 cursor-pointer
                               ${
                                 added
                                   ? "bg-green-600 hover:bg-green-700"
                                   : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                               }`}
                  >
                    {added ? "✓ Added to Cart" : "Add to Cart"}
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="w-full py-3 px-6 rounded-xl bg-gray-200 text-gray-500 
                             font-medium text-base cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;

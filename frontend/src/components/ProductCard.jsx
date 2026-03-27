import { memo } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden 
                 hover:shadow-xl hover:border-gray-200 transition-all duration-300 
                 hover:-translate-y-1 flex flex-col"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="mt-1 text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg
                       hover:bg-indigo-700 active:scale-95 transition-all duration-200
                       cursor-pointer"
          >
            Add to Cart
          </button>
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <p className="mt-2 text-xs text-amber-600 font-medium">
            Only {product.stock} left in stock
          </p>
        )}
        {product.stock === 0 && (
          <p className="mt-2 text-xs text-red-600 font-medium">Out of stock</p>
        )}
      </div>
    </Link>
  );
}

export default memo(ProductCard);

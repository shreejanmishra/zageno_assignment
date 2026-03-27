import { memo } from "react";
import useCartStore from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";
import QuantitySelector from "./QuantitySelector";

function CartItem({ item }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">
          {formatPrice(item.price)} each
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(qty) => updateQuantity(item._id, qty)}
          />

          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              onClick={() => removeFromCart(item._id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 
                         rounded-lg transition-colors cursor-pointer"
              title="Remove item"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CartItem);

import { memo } from "react";

function QuantitySelector({ quantity, onChange, max = 99 }) {
  return (
    <div className="flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40 
                   disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        −
      </button>
      <span className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 min-w-[40px] text-center">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40 
                   disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export default memo(QuantitySelector);

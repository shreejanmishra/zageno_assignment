import { memo } from "react";
import { formatPrice } from "../utils/formatPrice";

function OrderCard({ order }) {
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Order Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Order ID
          </p>
          <p className="text-sm font-mono font-medium text-gray-900">
            {order._id}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Placed on
          </p>
          <p className="text-sm text-gray-700">{date}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6">
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
              <span className="text-sm font-medium text-gray-900 flex-shrink-0">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(order.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderCard);

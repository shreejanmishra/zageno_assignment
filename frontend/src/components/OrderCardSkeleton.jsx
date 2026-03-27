import { memo } from "react";

function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-48" />
        </div>
        <div className="text-left sm:text-right">
          <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>

      {/* Items */}
      <div className="p-6 space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gray-200 flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-1" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-16 flex-shrink-0" />
          </div>
        ))}

        {/* Total */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
          <div className="h-5 bg-gray-200 rounded w-12" />
          <div className="h-5 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export default memo(OrderCardSkeleton);

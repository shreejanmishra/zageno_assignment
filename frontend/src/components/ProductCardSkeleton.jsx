import { memo } from "react";

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 flex flex-col flex-1">
        <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-full mb-1" />
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="mt-auto flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-16" />
          <div className="h-9 bg-gray-200 rounded-lg w-24" />
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCardSkeleton);

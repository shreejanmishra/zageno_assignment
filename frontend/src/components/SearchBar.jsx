import { useCategories } from "../hooks/useProducts";

function SearchBar({ search, onSearchChange, category, onCategoryChange }) {
  const { data: categories = [] } = useCategories();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl
                     text-sm text-gray-900 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     transition-all duration-200"
        />
      </div>

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                   transition-all duration-200 cursor-pointer min-w-[160px]"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;

import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useDebounce } from "../hooks/useDebounce";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import SearchBar from "../components/SearchBar";

function ProductListPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  // Reset to page 1 when search or category changes
  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const {
    data: products,
    isLoading,
    error,
  } = useProducts({ search: debouncedSearch, category, page, limit: 12 });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
        <p className="mt-2 text-gray-600">
          Discover our curated collection of premium products
        </p>
      </div>

      <div className="mb-6">
        <SearchBar
          search={search}
          onSearchChange={handleSearchChange}
          category={category}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Failed to load products</p>
          <p className="text-gray-400 mt-1 text-sm">{error.message}</p>
        </div>
      )}

      {products?.products && products.products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400 mt-1 text-sm">
            Try adjusting your search or filter
          </p>
        </div>
      )}

      {products?.products && products.products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          {products.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{products.currentPage}</span> of{" "}
                    <span className="font-medium">{products.totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={products.currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span className="sr-only">Previous</span>
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(products.totalPages, p + 1))}
                      disabled={products.currentPage === products.totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span className="sr-only">Next</span>
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductListPage;

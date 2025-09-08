"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/lib/types/Product";
import FilterBar from "@/components/common/FilterBar";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  initialProducts: Product[];
  initialTotal: number;
  initialFilters: {
    page: number;
    limit: number;
    minPrice: number;
    maxPrice: number;
    category: string;
    search: string | null;
  };
};

export default function ProductsPageLayout({
  initialProducts,
  initialTotal,
  initialFilters,
}: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [totalProducts, setTotalProducts] = useState(initialTotal);
  const [page, setPage] = useState(initialFilters.page);
  const [limit] = useState(initialFilters.limit);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);
  const [category, setCategory] = useState(initialFilters.category);
  const [search, setSearch] = useState<string | null>(initialFilters.search);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  
  // Track if it's the initial render
  const isInitialMount = useRef(true);

  // Handle filter changes (excluding page changes)
  useEffect(() => {
    // Skip the initial mount to prevent double fetching
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const fetchFilteredProducts = async () => {
      setIsFilterLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/product/get`, {
          params: {
            page: 1, // Always reset to page 1 when filters change
            limit,
            minPrice,
            maxPrice,
            category,
            search: search || ""
          }
        });
        setProducts(res.data.products);
        setTotalProducts(res.data.totalProduct);
        setPage(1); // Reset page to 1
      } catch (error) {
        console.error("Filter fetch error:", error);
      } finally {
        setIsFilterLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [minPrice, maxPrice, category, search, limit]); // Removed page dependency

  // Load more products
  const handleLoadMore = useCallback(async () => {
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await axios.get(`${BASE_URL}/api/v1/product/get`, {
        params: {
          page: nextPage,
          limit,
          minPrice,
          maxPrice,
          category,
          search: search || ""
        }
      });
      setProducts((prev) => [...prev, ...res.data.products]);
      setPage(nextPage);
      setTotalProducts(res.data.totalProduct);
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, limit, minPrice, maxPrice, category, search]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-[#131921] to-[#232F3E] py-8 px-4 mb-8">
        <div className="w-full text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Summer Sale: Up to 50% Off!
          </h1>
          <p className="text-base sm:text-lg text-white opacity-90 mb-6 max-w-2xl mx-auto">
            Discover amazing deals on thousands of products
          </p>
          <button className="bg-white text-gray-900 font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow-lg hover:bg-gray-100">
            Shop Now
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="w-full px-4 mb-8">
        <FilterBar
          onFilterChange={(filters) => {
            setMinPrice(filters.minPrice);
            setMaxPrice(filters.maxPrice);
            setCategory(filters.category);
            setSearch(filters.search);
          }}
        />
      </div>

      {/* Products */}
      <div className="w-full px-4">
        {isFilterLoading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Loading products...
            </h3>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {products.length < totalProducts && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg"
                >
                  {isLoadingMore ? "Loading..." : "Load More Products"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">😢</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/lib/types/Product";
import FilterBar from "@/components/common/FilterBar";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import { BASE_URL } from "@/lib/services/api/fetchers";
import HeroTextSection from "./HeroTextSection";

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
  onFilterChange?: (filters: {
    minPrice: number;
    maxPrice: number;
    category: string;
    search: string | null;
  }) => void;
};

export default function ProductsPageLayout({
  initialProducts,
  initialTotal,
  initialFilters,
  onFilterChange
}: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [totalProducts, setTotalProducts] = useState(initialTotal);
  const [page, setPage] = useState(initialFilters.page);
  const [limit] = useState(initialFilters.limit);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "";
  const subcategoryFromUrl = searchParams.get("subcategory") || "";

  // Use URL params as priority, fall back to initialFilters
  const [category, setCategory] = useState(
    categoryFromUrl || initialFilters.category
  );
  const [search, setSearch] = useState<string | null>(
    subcategoryFromUrl || initialFilters.search
  );

  const isInitialMount = useRef(true);

  // Fetch products when URL params change (including initial load)
  useEffect(() => {
    const fetchProductsBasedOnUrl = async () => {
      // If we have URL params, use them instead of initial filters
      const effectiveCategory = categoryFromUrl || initialFilters.category;
      const effectiveSearch = subcategoryFromUrl || initialFilters.search;

      // Only fetch if URL params differ from current state
      if (effectiveCategory !== category || effectiveSearch !== search) {
        setIsFilterLoading(true);
        try {
          const res = await axios.get(`${BASE_URL}/api/v1/product/get`, {
            params: {
              page: 1,
              limit,
              minPrice: initialFilters.minPrice,
              maxPrice: initialFilters.maxPrice,
              category: effectiveCategory,
              search: effectiveSearch || ""
            }
          });

          setProducts(res.data.products);
          setTotalProducts(res.data.totalProduct);
          setPage(1);
          setCategory(effectiveCategory);
          setSearch(effectiveSearch);

          // Notify parent component of the filter change
          if (onFilterChange) {
            onFilterChange({
              minPrice: initialFilters.minPrice,
              maxPrice: initialFilters.maxPrice,
              category: effectiveCategory,
              search: effectiveSearch
            });
          }
        } catch (error) {
          console.error("URL-based fetch error:", error);
        } finally {
          setIsFilterLoading(false);
        }
      }
    };

    fetchProductsBasedOnUrl();
  }, [
    categoryFromUrl, // ✅ only depend on URL params
    subcategoryFromUrl,
    initialFilters,
    limit,
    onFilterChange
  ]);

  // Handle filter changes from FilterBar (excluding page changes)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const fetchFilteredProducts = async () => {
      setIsFilterLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/product/get`, {
          params: {
            page: 1,
            limit,
            minPrice,
            maxPrice,
            category,
            search: search || ""
          }
        });
        setProducts(res.data.products);
        setTotalProducts(res.data.totalProduct);
        setPage(1);
      } catch (error) {
        console.error("Filter fetch error:", error);
      } finally {
        setIsFilterLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [minPrice, maxPrice, category, search, limit]);

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
      <HeroTextSection
        title={
          categoryFromUrl
            ? `${categoryFromUrl} Collection`
            : "Summer Sale: Up to 50% Off!"
        }
        subtitle={
          subcategoryFromUrl
            ? `Discover our ${subcategoryFromUrl} selection`
            : "Discover amazing deals on thousands of products"
        }
      />

      {/* Filters */}
      <div className="w-full px-4 mb-8">
        <FilterBar
          onFilterChange={(filters) => {
            setMinPrice(filters.minPrice);
            setMaxPrice(filters.maxPrice);
            setCategory(filters.category);
            setSearch(filters.search);
          }}
          initialCategory={categoryFromUrl || initialFilters.category}
          initialSearch={subcategoryFromUrl || initialFilters.search || ""}
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
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-1 sm:gap-6">
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

"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/lib/types/Product";
import FilterBar from "@/components/common/FilterBar";
import axios from "axios";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { BASE_URL } from "@/lib/services/api/fetchers";
import HeroImageWithOffers from "./HeroTextSection";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/animations/shopping cart.json"

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
  const router = useRouter();
  const pathname = usePathname();

  const categoryFromUrl = searchParams.get("category") || "all";
  const subcategoryFromUrl = searchParams.get("subcategory") || "";

  const [category, setCategory] = useState(categoryFromUrl);
  const [search, setSearch] = useState<string | null>(
    subcategoryFromUrl || null
  );

   const isInitialMount = useRef(true);

  // ✅ Use useEffect to handle URL changes and update state
  useEffect(() => {
    const fetchProductsBasedOnUrl = async () => {
      const effectiveCategory = categoryFromUrl;
      const effectiveSearch = subcategoryFromUrl || null;

      // Only fetch if the URL parameters have changed
      if (effectiveCategory !== category || effectiveSearch !== search) {
        setIsFilterLoading(true);
        try {
          const res = await axios.get(`${BASE_URL}/api/v1/product/get`, {
            params: {
              page: 1,
              limit,
              minPrice,
              maxPrice,
              category: effectiveCategory,
              search: effectiveSearch || ""
            }
          });

          setProducts(res.data.products);
          setTotalProducts(res.data.totalProduct);
          setPage(1);
          setCategory(effectiveCategory);
          setSearch(effectiveSearch);

          if (onFilterChange) {
            onFilterChange({
              minPrice,
              maxPrice,
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
    categoryFromUrl,
    subcategoryFromUrl,
    limit,
    minPrice,
    maxPrice,
    onFilterChange,
    router,
    pathname
  ]);

  // ✅ FilterBar changes (slug + search)
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
    <div className="min-h-screen max-h-auto bg-white mb-28">
      <HeroImageWithOffers />
      <div className="w-full px-4 mb-8">
        <FilterBar
          onFilterChange={(filters) => {
            setMinPrice(filters.minPrice);
            setMaxPrice(filters.maxPrice);
            setCategory(filters.category); // ✅ slug
            setSearch(filters.search);
          }}
          initialCategory={categoryFromUrl}
          initialSearch={subcategoryFromUrl || ""}
        />
      </div>
<div className="w-full px-4">
  {isFilterLoading ? (
    <div className="flex flex-col items-center justify-center py-12">
      <Lottie
        animationData={loadingAnimation}
        loop
        className="w-60 h-60" 
      />
      <h3 className="text-xl font-medium text-gray-800 mt-6">
        Loading products...
      </h3>
    </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-12 gap-x-1 gap-y-4">
              {products.map((product) => (
                <div
                  className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 flex justify-center"
                  key={product._id}
                >
                  <ProductCard product={product} />
                </div>
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

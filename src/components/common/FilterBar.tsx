"use client";
import React, { useState, useEffect, useRef } from "react";
import { IndianRupee, RotateCcw, Search, X } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  _id: string;
  id?: string;
  name: string;
  slug: string;
}

interface FilterBarProps {
  onFilterChange: (filters: {
    minPrice: number;
    maxPrice: number;
    category: string;
    search: string | null;
  }) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export default function FilterBar({
  onFilterChange,
  initialCategory = "all",
  initialSearch = ""
}: FilterBarProps) {
  const [categoryName, setCategoryName] = useState(initialCategory);
  const [categorySlug, setCategorySlug] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");
  const [showPriceSlider, setShowPriceSlider] = useState(false);
  const { categories, isPending, isError } = useCategories();

  const priceMenuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract categories array from the response
  const categoriesArray = React.useMemo(() => {
    if (!categories) return [];

    // If categories is already an array, return it
    if (Array.isArray(categories)) return categories;

    // If categories has a categories property that is an array
    if (categories.categories && Array.isArray(categories.categories)) {
      return categories.categories;
    }

    // If categories has a data property that is an array
    if (categories.data && Array.isArray(categories.data)) {
      return categories.data;
    }

    // Default empty array
    return [];
  }, [categories]);

  // Close price menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        priceMenuRef.current &&
        !priceMenuRef.current.contains(event.target as Node)
      ) {
        setShowPriceSlider(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update state when URL params change
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "all";
    const searchFromUrl = searchParams.get("subcategory") || "";

    if (categoryFromUrl !== categoryName) {
      setCategoryName(categoryFromUrl);
    }

    if (searchFromUrl !== searchQuery) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams, categoryName, searchQuery]);

  const resetFilters = () => {
    setCategoryName("all");
    setPriceRange([0, 2000]);
    setSearchQuery("");
    setShowPriceSlider(false);

    // Update URL
    const params = new URLSearchParams();
    params.delete("category");
    params.delete("subcategory");
    router.push(`?${params.toString()}`);

    onFilterChange({
      minPrice: 0,
      maxPrice: 2000,
      category: "all",
      search: null
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        category: categoryName,
        search: searchQuery.trim() || null
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [priceRange, categoryName, searchQuery, onFilterChange]);

  const handlePriceChange = (index: number, value: string) => {
    const newPriceRange = [...priceRange];
    const numValue = parseInt(value) || 0;
    newPriceRange[index] = Math.min(Math.max(0, numValue), 2000);

    if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
      newPriceRange[1] = newPriceRange[0];
    } else if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
      newPriceRange[0] = newPriceRange[1];
    }

    setPriceRange(newPriceRange);
  };

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);

    // Ensure min doesn't exceed max and vice versa
    if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
      newPriceRange[1] = newPriceRange[0];
    } else if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
      newPriceRange[0] = newPriceRange[1];
    }

    setPriceRange(newPriceRange);
  };

  const handleCategoryChange = (slug: string) => {
    // Update state with slug
    setCategorySlug(slug);

    // Update URL with slug
    const params = new URLSearchParams(window.location.search);

    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug); // ✅ push slug not name
    }

    // Clear subcategory when changing main category
    params.delete("subcategory");
    setSearchQuery("");

    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Update URL with search query as subcategory
    const params = new URLSearchParams(window.location.search);

    if (value.trim()) {
      params.set("subcategory", value);
    } else {
      params.delete("subcategory");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="rounded-lg p-2 sm:p-6 mb-8 bg-white max-w-full mx-auto relative">
      {/* Top Row: Search + Price Range */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        {/* Search input full-width on mobile */}
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full focus:ring-none"
            />
          </div>
        </div>

        {/* Buttons stack nicely */}
        <div className="w-full sm:w-1/2 flex gap-2 sm:justify-end">
          <div className="relative" ref={priceMenuRef}>
            <button
              onClick={() => setShowPriceSlider(!showPriceSlider)}
              className="flex-1 sm:flex-none flex items-center gap-1 px-4 py-2 text-sm sm:text-base rounded-lg border bg-gray-100 hover:bg-gray-200"
            >
              <IndianRupee className="w-4 h-4" />
              <span>Price Range</span>
            </button>

            {/* Price Range Context Menu - Fixed responsive positioning */}
            {showPriceSlider && (
              <div
                className="
                  fixed sm:absolute 
                  top-1/2 sm:top-full left-1/2 -translate-x-1/2 sm:-translate-x-0 sm:left-auto sm:right-0 
                  -translate-y-1/2 sm:translate-y-0
                  mt-0 sm:mt-2 
                  z-50
                  w-[90vw] max-w-sm sm:w-96
                  bg-white border border-gray-200 rounded-lg shadow-xl p-4
                "
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-base">Price Range</h3>
                  <button
                    onClick={() => setShowPriceSlider(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Slider */}
                <div className="mb-6">
                  <div className="relative h-1 bg-gray-200 rounded">
                    <div
                      className="absolute h-1 bg-gray-800 rounded"
                      style={{
                        left: `${(priceRange[0] / 2000) * 100}%`,
                        right: `${100 - (priceRange[1] / 2000) * 100}%`
                      }}
                    ></div>
                  </div>

                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[0]}
                      onChange={(e) => handleSliderChange(e, 0)}
                      className="absolute w-full h-1 opacity-0 cursor-pointer z-20"
                    />
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => handleSliderChange(e, 1)}
                      className="absolute w-full h-1 opacity-0 cursor-pointer z-20"
                    />

                    <div className="relative h-6">
                      <div
                        className="absolute w-4 h-4 bg-gray-800 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                        style={{
                          left: `${(priceRange[0] / 2000) * 100}%`,
                          top: "50%"
                        }}
                      ></div>
                      <div
                        className="absolute w-4 h-4 bg-gray-800 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                        style={{
                          left: `${(priceRange[1] / 2000) * 100}%`,
                          top: "50%"
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Inputs */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex-1 w-full">
                    <label className="text-sm text-gray-500 mb-1 block">
                      Min
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        min="0"
                        max="2000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="hidden sm:block mt-5 pt-1 text-gray-400">
                    -
                  </div>

                  <div className="flex-1 w-full">
                    <label className="text-sm text-gray-500 mb-1 block">
                      Max
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={resetFilters}
            className="flex-1 sm:flex-none flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="w-full">
        {isPending ? (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-9 w-20 bg-gray-200 animate-pulse rounded-full"
              ></div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-sm text-red-500">Failed to load categories</div>
        ) : (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:flex-wrap sm:overflow-visible">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-3 sm:px-4 py-2 rounded-sm text-sm font-medium transition-all whitespace-nowrap ${
                categoryName === "all"
                  ? "bg-gray-800 text-white border  shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
              }`}
            >
              All
            </button>
            {categoriesArray.map((cat: Category) => (
              <button
                key={cat._id || cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-3 sm:px-4 py-2 rounded-sm text-sm font-medium transition-all whitespace-nowrap ${
                  categorySlug === cat.slug
                    ? "bg-gray-800 text-white border border-indigo-500 shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
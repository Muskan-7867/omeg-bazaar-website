"use client";
import React, { useState, useEffect } from "react";
import {
  Filter,
  RotateCcw,
  DollarSign,
  ChevronDown,
  Search,
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories";

interface Category {
  _id: string;
  id?: string;
  name: string;
}

interface FilterBarProps {
  onFilterChange: (filters: {
    minPrice: number;
    maxPrice: number;
    category: string;
    search: string | null;
  }) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [categoryId, setCategoryId] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPriceSlider, setShowPriceSlider] = useState(false);

  const { categories, isPending, isError } = useCategories();

  const resetFilters = () => {
    setCategoryId("all");
    setPriceRange([0, 2000]);
    setSearchQuery("");
    setShowPriceSlider(false);

    onFilterChange({
      minPrice: 0,
      maxPrice: 2000,
      category: "all",
      search: null,
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        category: categoryId,
        search: searchQuery.trim() || null,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [priceRange, categoryId, searchQuery, onFilterChange]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

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

  const handleCategoryChange = (newCategoryId: string) => {
    setCategoryId(newCategoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="shadow-lg rounded-lg p-4 sm:p-6 mb-8 bg-white max-w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-800" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Product Filters
          </h2>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors px-2 sm:px-3 py-1.5 rounded-lg hover:bg-indigo-50"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden flex items-center gap-1 text-sm text-gray-600 px-2 sm:px-3 py-1.5 rounded-lg bg-indigo-50"
          >
            {isExpanded ? "Hide" : "Show"} Filters
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-gray-300 outline-none transition-colors text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
        <div className="flex flex-col gap-6">
          {/* Categories */}
          <div className="w-full">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Categories
            </h3>
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
              <div className="text-sm text-red-500">
                Failed to load categories
              </div>
            ) : (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:flex-wrap sm:overflow-visible">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    categoryId === "all"
                      ? "bg-gray-800 text-white border border-indigo-500 shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  All
                </button>
                {categories.map((cat: Category) => (
                  <button
                    key={cat._id || cat.id}
                    onClick={() =>
                      handleCategoryChange(cat._id || cat.id || "")
                    }
                    className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      categoryId === (cat._id || cat.id)
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

          {/* Price Range */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Price Range
            </h3>
            <button
              onClick={() => setShowPriceSlider(!showPriceSlider)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                showPriceSlider
                  ? "bg-indigo-100 text-gray-800 border-indigo-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Set Price Range</span>
            </button>

            {showPriceSlider && (
              <div className="mt-4 space-y-4 animate-fadeIn">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>

                {/* Slider */}
                <div className="relative h-8">
                  <div className="absolute h-1.5 bg-gray-300 rounded-full top-1/2 -translate-y-1/2 w-full"></div>

                  <div
                    className="absolute h-1.5 bg-gray-800 rounded-full top-1/2 -translate-y-1/2"
                    style={{
                      left: `${(priceRange[0] / 2000) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / 2000) * 100}%`,
                    }}
                  ></div>

                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(0, e.target.value)}
                    className="absolute w-full h-5 top-1/2 -translate-y-1/2 opacity-0 z-20 cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                    className="absolute w-full h-5 top-1/2 -translate-y-1/2 opacity-0 z-20 cursor-pointer"
                  />

                  <div
                    className="absolute w-5 h-5 bg-white border-2 border-gray-600 rounded-full shadow-md top-1/2 -translate-y-1/2 cursor-pointer z-30"
                    style={{ left: `${(priceRange[0] / 2000) * 100}%` }}
                  ></div>
                  <div
                    className="absolute w-5 h-5 bg-white border-2 border-gray-600 rounded-full shadow-md top-1/2 -translate-y-1/2 cursor-pointer z-30"
                    style={{ left: `${(priceRange[1] / 2000) * 100}%` }}
                  ></div>
                </div>

                {/* Manual inputs */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="2000"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(0, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-0  text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(1, e.target.value)}
                      className="w-full px-3 py-2 border  rounded-md focus:ring-0 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 
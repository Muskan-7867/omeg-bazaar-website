"use client";
import React, { useState, useEffect } from "react";
import {  Search } from "lucide-react";
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
  initialCategory?: string; // Add this
  initialSearch?: string;
}

export default function FilterBar({
  onFilterChange,
  initialCategory = "all",
  initialSearch
}: FilterBarProps) {
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
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
      search: null
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        category: categoryId,
        search: searchQuery?.trim() || null
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [priceRange, categoryId, searchQuery, onFilterChange]);

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
    <div className="rounded-lg p-2 sm:p-6 mb-8 bg-white max-w-full mx-auto">
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
          <button
            onClick={() => setShowPriceSlider(!showPriceSlider)}
            className="flex-1 sm:flex-none px-4 py-2 text-sm sm:text-base rounded-lg border bg-gray-100 hover:bg-gray-200"
          >
            💲 Price Range
          </button>
          <button
            onClick={resetFilters}
            className="flex-1 sm:flex-none px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
          >
            ♻ Reset
          </button>
        </div>
      </div>

      {/* Price Slider / Inputs */}
      {showPriceSlider && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
              className="w-full px-3 py-2 border rounded-md focus:ring-0 text-sm sm:text-base"
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
              className="w-full px-3 py-2 border rounded-md focus:ring-0 text-sm sm:text-base"
            />
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="w-full">
        {/* <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3> */}
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
                categoryId === "all"
                  ? "bg-gray-800 text-white border  shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((cat: Category) => (
              <button
                key={cat._id || cat.id}
                onClick={() => handleCategoryChange(cat._id || cat.id || "")}
                className={`px-3 sm:px-4 py-2 rounded-sm text-sm font-medium transition-all whitespace-nowrap ${
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
    </div>
  );
}

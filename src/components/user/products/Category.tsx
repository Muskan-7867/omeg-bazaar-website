"use client";

import { BsFilter } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import type { Category as CategoryType } from "@/lib/types/Product";
import { getCategories } from "@/lib/services/api/categoryService";

interface Props {
  category: string;
  setCategory: (val: string) => void;
}

const Category = ({ category, setCategory }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Safely extract categories as an array
  const categories: CategoryType[] =
    Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      <div className="flex-1 min-w-[150px] border border-gray-200 rounded-lg">
        <select
          id="category-select"
          className="w-full p-2 rounded-md focus:outline-none bg-transparent"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isLoading || isError} // optional: disable during loading/error
        >
          {isLoading && <option>Loading Categories...</option>}
          {isError && <option>Error loading categories</option>}
          <option value="all">All</option>
          {categories.map((cat: CategoryType) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Filter Toggle Button */}
      <button
        className="lg:hidden flex items-center justify-center p-2 rounded-lg border border-gray-200"
        aria-label="Filter"
      >
        <BsFilter size={24} />
      </button>
    </div>
  );
};

export default Category;

"use client"
import { parseAsBoolean, useQueryState } from "nuqs";
import { BsFilter } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQuery } from "@/lib/services/api/queries";
import type { Category } from "@/lib/types/Product";


const Category = () => {
  const [price, setPrice] = useQueryState(
    "price",
    parseAsBoolean.withDefault(false)
  );
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all"
  });

  const {
    data: categories,
    isPending,
    isError
  } = useQuery(getCategoriesQuery());

  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      <div className="flex-1 min-w-[150px] border border-gray-200 rounded-lg">
        <select
          id="category-select"
          className="w-full p-2 rounded-md focus:outline-none bg-transparent"
          value={category || ""}
          onChange={(e) => {
            const value = e.target.value;
            console.log("from category", value);
            setCategory(value);
          }}
        >
          {isPending && <option>Loading Categories...</option>}
          {isError && <option>Error loading categories</option>}
          <option value="all">All</option>
          {categories?.map((category: Category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Filter Toggle Button */}
      <button 
        onClick={() => setPrice(!price)}
        className="lg:hidden flex items-center justify-center p-2 rounded-lg border border-gray-200"
        aria-label="Filter"
      >
        <BsFilter size={24} />
      </button>
    </div>
  );
};

export default Category;
"use client";
import Category from "@/components/user/products/Category";
import { TfiSearch } from "react-icons/tfi";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  minPrice: number;
  setMinPrice: (val: number) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
}

const ProductFilterBar = ({
  search,
  setSearch,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-3 p-3 rounded-lg w-full bg-white">
      {/* Search Input */}
      <div className="flex-1 flex items-center border gap-3 border-gray-300 rounded-lg px-3 py-2">
        <TfiSearch className="text-gray-500 flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 outline-none text-gray-700 bg-transparent min-w-[50px]"
        />
      </div>

      {/* Category Dropdown */}
      <Category category={category} setCategory={setCategory} />

      {/* Price Inputs (optional UI improvement) */}
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          placeholder="Min Price"
          className="w-24 border rounded-lg px-2 py-1"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          placeholder="Max Price"
          className="w-24 border rounded-lg px-2 py-1"
        />
      </div>
    </div>
  );
};

export default ProductFilterBar;

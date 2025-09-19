"use client";

import { getCategories } from "@/lib/services/api/categoryService";
import { CategoryType } from "@/lib/types/Product";

import { useQuery } from "@tanstack/react-query";


type ProductCategoryProps = {
  category: string;
  setCategory: (categoryId: string) => void;
};

const ProductCategory: React.FC<ProductCategoryProps> = ({
  category,
  setCategory
}) => {
 const { data, isLoading, isError } = useQuery({
     queryKey: ["categories"],
     queryFn: getCategories,
   });
    console.log("from prod ", data)
const categories: CategoryType[] =
    Array.isArray(data) ? data : Array.isArray(data?.categories) ? data.categories : [];

   
  return (
    <div className="w-full flex items-center gap-2 justify-between">
      <div className="w-full px-2 border border-gray-200 rounded-lg">
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading Categories...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">Error loading categories</p>
        ) : (
          <select
            id="category-select"
            className="w-full p-2 rounded-md focus:outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            {categories?.map((cat: CategoryType) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;

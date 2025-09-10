"use client";

import { getCategoriesQuery } from "@/lib/services/api/queries";
import { Category } from "@/lib/types/Product";
import { useQuery } from "@tanstack/react-query";


type ProductCategoryProps = {
  category: string;
  setCategory: (categoryId: string) => void;
};

const ProductCategory: React.FC<ProductCategoryProps> = ({
  category,
  setCategory
}) => {
  const {
    data: categories,
    isPending,
    isError
  } = useQuery(getCategoriesQuery());

  return (
    <div className="w-full flex items-center gap-2 justify-between">
      <div className="w-full px-2 border border-gray-200 rounded-lg">
        {isPending ? (
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
            {categories?.map((cat: Category) => (
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

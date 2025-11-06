"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PaddingWrapper from "../../wrappers/PaddingWrapper";
import AddCategoryForm from "./components/AddCategoryForm";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "./components/ConfirmModal";
import { getAdminCategoriesQuery } from "@/lib/services/api/queries";
import { CategoryType } from "@/lib/types/Product";
import { deleteCategory, fetchCategory } from "@/lib/services/api/fetchers";
import { useSearchParams, useRouter } from "next/navigation";

const Categories = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category"); // current category from URL
  const { data, isPending, isError } = useQuery(getAdminCategoriesQuery());
  console.log("from admin ", data)
  const [Categories, setCategories] = useState<CategoryType[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleApproved = async (categoryId: string) => {
    console.log("from approved", categoryId);
    try {
      const response = await fetchCategory(categoryId);
      queryClient.invalidateQueries({ queryKey: ["admincategories"] });

      // set category in URL
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", response._id);
      router.push(`?${params.toString()}`);
    } catch {
      console.log("error");
    }
  };

  const handleDelete = async () => {
    if (!selectedCategoryId) return;
    try {
      await deleteCategory(selectedCategoryId);
      queryClient.invalidateQueries({ queryKey: ["admincategories"] });
      setIsConfirmOpen(false);
      setSelectedCategoryId(null);
    } catch {
      console.error("error for delete category");
    }
  };

  return (
    <PaddingWrapper>
      <div className="grid grid-cols-12 gap-4 mt-6 lg:mt-2 ">
        <div className="lg:col-span-7 col-span-12 p-4 lg:p-6">
          <h1 className="text-xl font-bold font-serif mb-4">All Categories</h1>
          <div className="flex justify-center lg:justify-start gap-4 flex-wrap">
            {isPending && (
              <div className="w-full text-center">
                <p>Loading Categories...</p>
              </div>
            )}
            {isError && (
              <div className="w-full text-center">
                <p>Error loading categories</p>
              </div>
            )}

            {Categories.map((categoryItem, index) => (
              <motion.div
                key={categoryItem._id}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("category", categoryItem._id);
                  router.push(`?${params.toString()}`);
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`cursor-pointer flex flex-col items-center gap-3 flex-shrink-0 w-28 sm:w-36 ${
                  category === categoryItem._id ? "" : ""
                }`}
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-md shadow-md border-2 border-white  transition-all duration-500 group overflow-hidden relative">
                  <motion.img
                    src={
                      categoryItem.images?.[0]?.url ||
                      "https://via.placeholder.com/150"
                    }
                    alt={categoryItem.name}
                    className="w-full h-full object-contain p-2"
                    transition={{ duration: 0.1 }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategoryId(categoryItem._id);
                      setIsConfirmOpen(true);
                    }}
                    className="absolute top-1 right-1 bg-white text-red-600 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete"
                  >
                    <FaTrash size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/admin/category/edit/${categoryItem._id}`
                      );
                    }}
                    className="absolute bottom-1 left-1 bg-white text-blue-600 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Edit"
                  >
                    ✏️
                  </button>
                </div>
                <span className="text-sm sm:text-base font-medium text-gray-700 text-center">
                  {categoryItem.name.charAt(0).toUpperCase() +
                    categoryItem.name.slice(1)}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApproved(categoryItem._id);
                  }}
                  className={`w-full ${
                    categoryItem.approved ? "bg-green-400" : "bg-red-400"
                  } text-white p-1 rounded-md text-xs sm:text-sm hover:opacity-90 transition`}
                >
                  {categoryItem.approved ? "Approved" : "Not Approved"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => {
            setIsConfirmOpen(false);
            setSelectedCategoryId(null);
          }}
          onConfirm={handleDelete}
        />

        <div className="lg:col-span-5 col-span-12 p-4 lg:p-6">
          <h1 className="text-xl font-bold font-serif mb-4">Category Form</h1>
          <AddCategoryForm />
        </div>
      </div>
    </PaddingWrapper>
  );
};

export default Categories;

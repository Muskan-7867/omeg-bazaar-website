// hooks/useCategories.js
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQuery } from "@/lib/services/api/queries";

export const useCategories = () => {
  const {
    data: categories = [],
    isPending,
    isError,
    error,
  } = useQuery(getCategoriesQuery);

  return {
    categories,
    isPending,
    isError,
    error,
  };
};

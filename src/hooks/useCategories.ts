
import { getCategoriesQuery } from "@/lib/services/api/queries";
import { useQuery } from "@tanstack/react-query";


export const useCategories = () => {
  const {
    data: categories = [],
    isPending,
    isError,
    error
  } = useQuery(getCategoriesQuery());

  return {
    categories,
    isPending,
    isError,
    error
  };
};
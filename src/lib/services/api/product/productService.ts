import { Product } from "@/lib/types/Product";
import { BASE_URL } from "../fetchers";
import axios from "axios";

// Function to fetch filtered products (with query params)
export const getFilteredProducts = async (
  page: number,
  limit: number,
  minPrice: number,
  maxPrice: number,
  category: string,
  search: string | null
): Promise<{ ProductCount: number; products: Product[] }> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/product/get`, {
      params: {
        page,
        limit,
        minPrice,
        maxPrice,
        category,
        search: search || ""
      },
    });

    return {
      ProductCount: response.data.totalProduct,
      products: response.data.products,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};

import axios from "axios";
import { Product } from "@/lib/types/Product";
import ProductsPageLayout from "./ProductsPageLayout";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getFilteredProducts(
  page: number,
  limit: number,
  minPrice: number,
  maxPrice: number,
  category: string,
  search: string | null
): Promise<{ ProductCount: number; products: Product[] }> {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/product/get`, {
      params: {
        page,
        limit,
        minPrice,
        maxPrice,
        category,
        search: search || ""
      }
    });
    console.log("from fetch", res.data);
    return {
      ProductCount: res.data.totalProduct,
      products: res.data.products
    };
  } catch (error) {
    console.error("SSR fetch error:", error);
    return { ProductCount: 0, products: [] };
  }
}

export default async function MainProductPage() {
  // ✅ Default filters for SSR
  const page = 1;
  const limit = 12;
  const minPrice = 0;
  const maxPrice = 1000000;
  const category = "all";
  const search = null;

  const { products, ProductCount } = await getFilteredProducts(
    page,
    limit,
    minPrice,
    maxPrice,
    category,
    search
  );

  return (
    <ProductsPageLayout
      initialProducts={products}
      initialTotal={ProductCount}
      initialFilters={{ page, limit, minPrice, maxPrice, category, search }}
    />
  );
}
"use server";

import { Product } from "@/lib/types/Product";
import { BASE_URL } from "./fetchers";

export async function getCartProducts(productIds: string[]): Promise<Product[]> {
  try {
    if (productIds.length === 0) return [];
    
    const response = await fetch(
      `${BASE_URL}/api/v1/product/cartproducts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: productIds }),
        cache: "no-store", // Ensure fresh data
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch cart products");
    }
    
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Failed to fetch cart product ids:", error);
    throw error;
  }
}
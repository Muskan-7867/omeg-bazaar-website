// lib/categoryService.js
import { BASE_URL } from "./fetchers";

export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/product/usercategories`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error('Failed to fetch categories, status:', res.status);
      return []; // Return empty array on error
    }

    const data = await res.json();
    return data || []; // Make sure something is always returned
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return empty array on exception
  }
}

import { BASE_URL } from "./fetchers";

// lib/categoryService.js
export async function getCategories() {
  try {
   
    // This could be a direct database query, API call, etc.
    const res = await fetch(`${BASE_URL}/api/v1/product/usercategories`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
import { getCategories } from "@/lib/services/api/categoryService";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug?: string;
}

export default async function CategoryNavbar() {
  const res = await getCategories();
  const categories: Category[] = Array.isArray(res) ? res : res?.categories || [];

  return (
    <nav className="bg-white text-black mt-14 hidden lg:block relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center space-x-6">
          {categories.length === 0 ? (
            <div className="text-gray-500">No categories found</div>
          ) : (
            categories.map((category) => (
              <div key={category._id} className="py-3">
                <Link
                  href={`/products?category=${encodeURIComponent(category._id)}`}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </nav>
  );
}

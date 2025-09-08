import { getCategories } from "@/lib/services/api/categoryService";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug?: string;
  subcategories?: string[];
}

export default async function CategoryNavbar() {
  // Fetch categories
  const res = await getCategories();

  // Normalize: ensure categories is always an array
  const categories: Category[] = Array.isArray(res)
    ? res
    : res?.categories || [];

  return (
    <nav className="bg-white text-black mt-14 hidden lg:block">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center space-x-6">
          {categories.length === 0 ? (
            <div className="text-gray-500">No categories found</div>
          ) : (
            categories.map((category) => (
              <CategoryItem key={category._id} category={category} />
            ))
          )}
        </div>
      </div>
    </nav>
  );
}

function CategoryItem({ category }: { category: Category }) {
  return (
    <div className="relative py-3 group">
      <button className="font-medium hover:text-primary transition-colors">
        {category.name}
      </button>

      {category.subcategories && category.subcategories.length > 0 && (
        <div className="absolute top-full left-0 w-64 bg-white text-gray-900 shadow-lg rounded-md py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="grid grid-cols-1 divide-y divide-gray-100">
            {category.subcategories.map((sub, idx) => (
              <Link
                key={idx}
                href={`/category/${category.slug || category._id}/${sub
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                {sub}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

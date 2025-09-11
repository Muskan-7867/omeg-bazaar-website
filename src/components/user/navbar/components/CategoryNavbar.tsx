import { getCategories } from "@/lib/services/api/categoryService";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug?: string;
  subcategories?: string[];
}

// Example: manually added subcategories
const manualSubcategories: Record<string, string[]> = {
  "Kitchen": ["Bridal Lehenga", "Party Wear Lehenga", "Designer Lehenga"],
  "fashion": ["Silk Saree", "Banarasi Saree", "Cotton Saree"],
  "electronics": ["Casual Kurti", "Anarkali Kurti", "Printed Kurti"],
};

export default async function CategoryNavbar() {
  const res = await getCategories();
  const categories: Category[] = Array.isArray(res) ? res : res?.categories || [];

  const updatedCategories = categories.map((cat) => ({
    ...cat,
    subcategories:
      cat.subcategories && cat.subcategories.length > 0
        ? cat.subcategories
        : manualSubcategories[cat.name] || [],
  }));

  return (
    <nav className="bg-white text-black mt-14 hidden lg:block relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center space-x-6">
          {updatedCategories.length === 0 ? (
            <div className="text-gray-500">No categories found</div>
          ) : (
            updatedCategories.map((category) => (
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
      {/* Link to category page */}
      <Link
        href={`/products?category=${encodeURIComponent(category._id)}`}
        className="font-medium hover:text-primary transition-colors"
      >
        {category.name}
      </Link>

      {category.subcategories && category.subcategories.length > 0 && (
        <div className="absolute top-full left-0 w-64 bg-white text-gray-900 shadow-lg rounded-md py-2 
          z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {category.subcategories.map((sub, idx) => (
            <Link
              key={idx}
              href={`/products?category=${encodeURIComponent(
                category.slug || category._id
              )}&subcategory=${encodeURIComponent(sub)}`}
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              {sub}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

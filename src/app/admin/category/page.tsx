import React, { Suspense } from "react";
import Categories from "@/components/admin/category/Categories";

export default function CategoryPage() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Categories />
      </Suspense>
    </div>
  );
}

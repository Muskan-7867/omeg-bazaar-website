import AddProductForm from "@/components/admin/products/AddProductForm";
import React, { Suspense } from "react";

export default function AdminAddProducts() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <AddProductForm />
      </Suspense>
    </>
  );
}

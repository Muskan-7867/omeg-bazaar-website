import Product from "@/components/admin/products/Product";
import React, { Suspense } from "react";

export default function AdminProducts() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Product />
      </Suspense>
    </>
  );
}

import React, { Suspense } from "react";
import Customers from "@/components/admin/customers/customers";

export default function CustomerPage() {
  return (
    <Suspense fallback={<p>Loading customers...</p>}>
      <Customers />
    </Suspense>
  );
}

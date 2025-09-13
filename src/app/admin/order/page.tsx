import Order from "@/components/admin/order/order";
import React, { Suspense } from "react";

export default function OrderPage() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Order />
      </Suspense>
    </>
  );
}

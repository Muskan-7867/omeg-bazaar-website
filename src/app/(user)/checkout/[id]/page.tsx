import CheckOut from "@/components/user/cart/components/CheckOut";
import React from "react";

interface CheckoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function Checkoutpage({ params }: CheckoutPageProps) {
  const { id } = await  params;
  return <CheckOut id={id} />;
}

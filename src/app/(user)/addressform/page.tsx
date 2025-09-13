import AddressForm from "@/components/user/address/AddressForm";
import React from "react";

interface AddressPageProps {
  params: Promise<{ userId: string }>;
}

export default async function AddressPage({ params }: AddressPageProps) {
  const { userId } = await params;
  return <AddressForm params={userId} />;
}

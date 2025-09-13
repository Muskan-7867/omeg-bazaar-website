import { fetchProductById } from "@/lib/services/api/fetchers";
import { Product } from "@/lib/types/Product";
import CheckOutClient from "./CheckoutClient";


interface CheckOutProps {
  id: string;
}

export default async function CheckOut({ id }: CheckOutProps) {
  if (!id) return <div>Product ID is required</div>;

  let singleproduct: Product | null = null;

  try {
    singleproduct = await fetchProductById(id);
  } catch (err) {
    console.error("Error fetching product:", err);
    return <div>Failed to load product</div>;
  }

  if (!singleproduct) return <div>Product not found</div>;

  return <CheckOutClient product={singleproduct} />;
}

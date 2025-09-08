"use client"
import { useEffect, useState } from "react";
import CartDetails from "./CartDetails";
import { useQuery } from "@tanstack/react-query";
import cartloader from "../../../../../public/animations/cartLoader.json";
import emptyCart from "../../../../../public/animations/emptycart.json";
import { ShoppingBag } from "lucide-react";
import Lottie from "lottie-react";
import CartSummary from "./CartSummary";
import { Product } from "@/lib/types/Product";
import useCartStore from "@/lib/store/Cart/Cart.store";
import { getCartProductIdQuery } from "@/lib/services/api/queries";


const CartLayout = () => {
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const productIds = JSON.parse(localStorage.getItem("productIds") || "[]");
  const decreaseCartCount = useCartStore((state) => state.decreaseCartCount);
  const {
    data: cartproducts,
    isLoading,
    isError
  } = useQuery(getCartProductIdQuery(productIds));

  useEffect(() => {
    if (cartproducts) {
      setProducts(cartproducts);
      const initialQuantities = cartproducts.reduce((acc, product) => {
        acc[product._id] = 1;
        return acc;
      }, {} as { [id: string]: number });
      setQuantities(initialQuantities);
    }
  }, [cartproducts]);

  const handleDelete = (id: string) => {
    try {
      const existing: string[] = JSON.parse(
        localStorage.getItem("productIds") || "[]"
      );
      if (!existing.includes(id)) {
        console.warn(`⚠️ Product ID "${id}" not found in localStorage.`);
        return;
      }
      const updated = existing.filter((prodId) => prodId !== id);
      localStorage.setItem("productIds", JSON.stringify(updated));
      setProducts((prev) => prev.filter((product) => product._id !== id));
      decreaseCartCount();
    } catch (error) {
      console.error("❌ Failed to delete product:", error);
    }
  };

  const handleChangeQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity
    }));
  };

  return (
    <div className="grid grid-cols-12 gap-4 mt-18 min-h-screen bg-white">
      <div className="lg:col-span-8 col-span-12 p-6">
        <h1 className="text-2xl font-bold font-serif mb-6 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" />
          Your Shopping Cart
        </h1>

        {isLoading ? (
          <div className="w-full flex flex-col items-center justify-center py-12">
            <Lottie
              animationData={cartloader}
              className="w-[12rem] h-[12rem] lg:w-[25rem] lg:h-[25rem]"
            />
            <p className="text-xl font-bold mt-4">Loading Cart Products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 border-r h-[45rem]">
            <Lottie animationData={emptyCart} className="w-64 h-64" />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mt-2 max-w-md text-center">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product._id} className="p-4 rounded-lg shadow-sm ">
                <CartDetails
                  product={product}
                  onDelete={handleDelete}
                  quantity={quantities[product._id] || 1}
                  handleChangeQuantity={handleChangeQuantity}
                />
              </li>
            ))}
          </ul>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-lg">
            <h3 className="text-xl font-semibold text-red-600">
              Failed to load cart products
            </h3>
            <p className="text-gray-600 mt-2">
              Please try refreshing the page or contact support if the problem
              persists.
            </p>
          </div>
        )}
      </div>

      <div className="lg:col-span-4 col-span-12 p-6 mt-14">
        {products.length > 0 ? (
          <CartSummary products={products} quantities={quantities} />
        ) : (
          <div className=" p-6 ">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Order Summary
            </h3>
            <div className="flex flex-col items-center justify-center py-8">
              <ShoppingBag className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center">
                Add items to your cart to see order summary
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartLayout;

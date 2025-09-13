"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import useCartStore from "@/lib/store/Cart/Cart.store";

const useCart = () => {
  const { setCartCount } = useCartStore();


  useEffect(() => {
    const ids = getCartProductIds();
    setCartCount(ids.length);
  }, [setCartCount]);

  const addProductToCart = (id: string) => {
    const prevProductIds = getCartProductIds();
    const updated = [...prevProductIds, id];
    Cookies.set("productIds", JSON.stringify(updated), { expires: 7 });
    setCartCount(updated.length);
  };

  const RemoveProductFromCart = (productId: string) => {
    const prevIds = getCartProductIds();
    const updated = prevIds.filter((id) => id !== productId);
    Cookies.set("productIds", JSON.stringify(updated), { expires: 7 });
    setCartCount(updated.length);
  };

  const getCartProductIds = (): string[] => {
    const cookieVal = Cookies.get("productIds");
    return cookieVal ? JSON.parse(cookieVal) : [];
  };

  return {
    addProductToCart,
    RemoveProductFromCart,
    getCartProductIds,
  };
};

export default useCart;

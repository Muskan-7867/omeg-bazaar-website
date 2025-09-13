import { useState } from "react";

import Cookies from "js-cookie";
import { PaymentType } from "@/components/user/cart/components/CartSummary";
import { AddressFormData } from "@/lib/types/auth";
import placeOrder from "@/lib/services/api/order";
import { useRouter } from "next/navigation";

interface OrderData {
  quantity: number;
  totalQuantity: number;
  totalPrice: number;
  address: AddressFormData;
  expectedDeliveryDate: Date
  orderItems: Array<{
    product: string;
    price: number;
    quantity: number;
  }>;
  status: string;
  deliveryCharges: number;
  payment: PaymentType;
  isPaid: boolean;
  paymentMethod: PaymentType;
}

export const useCODHandler = () => {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error"
  });
  const navigate = useRouter();

  const showPopup = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "success" });
      if (type === "success") {
        navigate.push("/products");
      }
    }, 3000);
  };

  const handleCODOrder = async (orderData: OrderData) => {
    try {
      setLoading(true);
      const response = await placeOrder(orderData, Cookies.get("authToken")!);

      if (response?.data?.success) {
        showPopup("Order placed successfully with Cash on Delivery.");
      } else {
        showPopup("Failed to place order: " + response?.data?.message, "error");
      }
    } catch (error) {
      console.error("COD order error:", error);
      showPopup("Failed to place COD order.", "error");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleCODOrder, popup };
};
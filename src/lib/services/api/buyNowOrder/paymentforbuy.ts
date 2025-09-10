import Cookies from "js-cookie";
import { BASE_URL } from "../fetchers";

 const VITE_BASE_URL = BASE_URL

export const createRazorpayOrder = async (
  productId: string,
  addressId: string,
  quantity: number,
  paymentMethod: string
) => {
 
  
  const response = await fetch(
    `${VITE_BASE_URL}/api/v1/order/razorpayorder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
      body: JSON.stringify({
        productid: productId,
        address: addressId,
        quantity: quantity,
        paymentMethod: paymentMethod,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create Razorpay order");
  }

  return response.json();
};

export const verifyPayment = async (
  razorpayResponse: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  },
  orderId: string,
  paymentMethod: string
) => {
  const response = await fetch(
    `${VITE_BASE_URL}/api/v1/order/paymentverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
      body: JSON.stringify({
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        orderId: orderId,
        paymentMethod: paymentMethod,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Payment verification failed");
  }

  return response.json();
};
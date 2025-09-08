import { useEffect, useState } from "react";
import PaymentSummary from "./PaymentSummary";
import SummaryDetails from "./SummaryDetails";
import { PaymentType } from "./CartSummary";

import PaymentLoader from "./PaymentLoader";
import PaymentPopUp from "./PaymentPopUp";
import { usePaymentHandlerForBuy } from "@/hooks/buynoworder/usePaymentHandlerForBuy";
import useCurrentUserStore from "@/lib/store/User/user.store";
import { AddressFormData, CurrentUser } from "@/lib/types/auth";
import { Product } from "@/lib/types/Product";

interface CartSummaryProps {
  products: Product[];
  quantities: { [id: string]: number };
}

const PaymentSummaryForBuy: React.FC<CartSummaryProps> = ({
  products,
  quantities
}) => {
  const { isLoggined } = useCurrentUserStore();
  const { currentUserFromStore } = useCurrentUserStore() as {
    currentUserFromStore: CurrentUser;
  };

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentType>("online_payment");

  const { loading, loginMsg, handleOrder, popup, setLoginMsg } =
    usePaymentHandlerForBuy();

  useEffect(() => {
    // This will run when the component mounts and when isLoggined changes
  }, [isLoggined, currentUserFromStore]);
  // In PaymentSummaryForBuy component
  useEffect(() => {
    if (isLoggined) {
      // Reset login message when user logs in
      setLoginMsg(false);
    }
  }, [isLoggined]);
  // Calculate order summary
  const subtotal = products.reduce((acc, product) => {
    const qty = quantities[product._id] || 1;
    return acc + product.price * qty;
  }, 0);

  const deliveryCharge = products.reduce((acc, product) => {
    const charge = Number(product?.deliveryCharges || 0);
    return acc + (isNaN(charge) ? 0 : charge);
  }, 0);

  const total = subtotal + deliveryCharge;
  const totalQuantity = Object.values(quantities).reduce(
    (acc, qty) => acc + qty,
    0
  );

  // Prepare order data
  const orderItems = products.map((product) => ({
    product: product._id,
    price: product.price,
    quantity: quantities[product._id] || 1
  }));

  // Get address with proper type checking
  const getAddress = (): AddressFormData => {
    const address = currentUserFromStore?.address;
    if (!address || typeof address !== "object") {
      // Return a default address object when none exists
      return {
        phone: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
      };
    }
    return address;
  };

  const orderData = {
    quantity: totalQuantity,
    totalQuantity,
    totalPrice: total,
     expectedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    address: getAddress(), // Now guaranteed to return AddressFormData
    orderItems,
    status: "pending",
    deliveryCharges: deliveryCharge,
    payment: paymentMethod,
    isPaid: paymentMethod === "online_payment",
    paymentMethod: paymentMethod
  };

  return (
    <div className="w-full mx-auto relative">
      {loginMsg && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded">
          Please log in to place your order. Redirecting...
        </div>
      )}

      {popup.show && <PaymentPopUp popup={popup} />}

      <SummaryDetails
        subtotal={subtotal}
        total={total}
        deliveryCharge={deliveryCharge}
      />

      <PaymentSummary
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <button
        onClick={() =>
          handleOrder(
            orderData,
            products,
            quantities,

            paymentMethod,
            isLoggined,
            currentUserFromStore
          )
        }
        className="bg-primary text-white py-2 px-4 rounded-full mt-6 w-full hover:bg-primary-dark transition-colors disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <PaymentLoader />
        ) : isLoggined ? (
          "Place Order"
        ) : (
          "Please Login to Place Order"
        )}
      </button>
    </div>
  );
};

export default PaymentSummaryForBuy;

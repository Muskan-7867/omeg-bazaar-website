import { useState } from "react";


import { useCODHandler } from "./useCodHandler";
import { useOnlinePaymentHandler } from "./useOnlineHandler";
import { PaymentType } from "@/components/user/cart/components/CartSummary";
import { AddressFormData, CurrentUser } from "@/lib/types/auth";
import { Product } from "@/lib/types/Product";
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

export const usePaymentHandlerForBuy = () => {
  const [loginMsg, setLoginMsg] = useState(false);
  const navigate = useRouter();

  const {
    loading: codLoading,
    handleCODOrder,
    popup: codPopup
  } = useCODHandler();

  const {
    loading: onlineLoading,
    handleOnlinePayment,
    popup: onlinePopup
  } = useOnlinePaymentHandler();

  const handleOrder = async (
    orderData: OrderData,
    products: Product[],
    quantities: { [id: string]: number },
    paymentMethod: PaymentType,
    isLoggined: boolean,
    currentUserFromStore: CurrentUser | null
  ) => {
    if (!isLoggined) {
      setLoginMsg(true);

      const currentPath = window.location.pathname;

      // ✅ Set previous path and login source
      sessionStorage.setItem("prevPath", currentPath);
      sessionStorage.setItem("loginFrom", "checkout");

      setTimeout(() => {
        navigate.push("/auth/login");
      }, 1000);
      return;
    }

    const address = currentUserFromStore?.address;
    if (!address || typeof address === "string" || !address._id) {
      navigate.push("/addressform");
      return;
    }

    const orderWithTypedAddress: OrderData = {
      ...orderData,
      address: address as AddressFormData
    };

    if (paymentMethod === "cash_on_delivery") {
      await handleCODOrder(orderWithTypedAddress);
    } else {
      await handleOnlinePayment(
        products,
        quantities,
        paymentMethod,
        currentUserFromStore
      );
    }
  };

  return {
    loading: codLoading || onlineLoading,
    loginMsg,
    setLoginMsg,
    handleOrder,
    popup: codPopup.show ? codPopup : onlinePopup
  };
};

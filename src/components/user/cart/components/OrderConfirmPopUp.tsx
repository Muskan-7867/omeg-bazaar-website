import { useState } from "react";
import useOrderHandler from "@/hooks/cartorder/useOrderHandler";
import { CurrentUser } from "@/lib/types/auth";
import { OrderData, Product } from "@/lib/types/Product";
import { useRouter } from "next/navigation";


interface Props {
  currentUserFromStore: CurrentUser;
  setShowConfirmPopUp: (value: boolean) => void;
  orderData: OrderData;
  products: Product[];
  paymentmethod: string;
  setShowSuccessPopup: (value: boolean) => void;
}

const OrderConfirmPopUp = ({
  currentUserFromStore,
  setShowConfirmPopUp,
  orderData,
  products,
  paymentmethod,
  setShowSuccessPopup
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useRouter();

  const { handlePlaceOrder } = useOrderHandler({
    orderData,
    products,
    paymentmethod,
    setLoading,
    setShowConfirmPopUp,
    setShowSuccessPopup
  });

  const handleCross = () => {
    if (!loading) {
      setShowConfirmPopUp(false);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      setError(null);
      setLoading(true);
      await handlePlaceOrder();
    } catch (err) {
      console.error("Error confirming order:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to place order. Please try again."
      );
    } finally {
      if (error) {
        setLoading(false);
      }
    }
  };

  // Safely access address properties
  const address = currentUserFromStore?.address;
  const isAddressValid = address && typeof address === "object";

  return (
    <div
      onClick={handleCross}
      className="fixed inset-0  backdrop-blur-xl bg-opacity-30 flex justify-center items-center z-50 p-4"
    >
      {loading ? (
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-800">
            Processing your order...
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Please wait while we confirm your details
          </p>
        </div>
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md animate-fade-in"
        >
          <div className="bg-primary p-5 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">Confirm Your Order</h2>
                <p className="text-sm opacity-90 mt-1">
                  Please verify your details before placing the order
                </p>
              </div>
              <button
                onClick={handleCross}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-5">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="border border-gray-200 rounded-lg p-4 mb-5">
              <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Delivery Address
              </h4>

              {isAddressValid ? (
                <div className="text-sm text-gray-600 space-y-1">
                  {address.address1 && <p>{address.address1},</p>}
                  {address.street && <p>{address.street},</p>}
                  <p>
                    {address.city}, {address.state},
                  </p>
                  <p>
                    {address.country} - {address.pincode}
                  </p>
                  {address.phone && (
                    <p className="mt-2">Phone: {address.phone}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No address provided
                </p>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 mb-5">
              <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Order Summary
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Items: {products.length}</p>
                <p>Total: ₹{orderData.totalPrice.toFixed(2)}</p>
                <p>Payment: {paymentmethod.replace(/_/g, " ")}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <button
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex-1 flex items-center justify-center"
                onClick={() => {
                  setShowConfirmPopUp(false);
                  navigate.push("/addressform");
                }}
                disabled={loading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                {isAddressValid ? "Change Address" : "Add Address"}
              </button>
              <button
                className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex-1 flex items-center justify-center disabled:opacity-70"
                onClick={handleConfirmOrder}
                disabled={loading || !isAddressValid}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmPopUp;

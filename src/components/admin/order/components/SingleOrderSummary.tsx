import { Order } from "@/lib/types/order";
import OrderPaymentInfo from "./OrderPaymentInfo";

const SingleOrderSummary = ({ selectedRow }: { selectedRow: Order }) => {
  console.log("from selected", selectedRow);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg text-gray-700 border-b pb-2 mb-3">
          Order Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">
              ₹
              {selectedRow.orderItems
                .map((item) => item.price * item.quantity)
                .reduce((a, b) => a + b, 0)
                .toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery:</span>
            <span className="font-medium">
              ₹{selectedRow.deliveryCharges?.toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold text-lg">
              ₹{selectedRow.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <OrderPaymentInfo selectedRow={selectedRow} />
    </div>
  );
};

export default SingleOrderSummary;

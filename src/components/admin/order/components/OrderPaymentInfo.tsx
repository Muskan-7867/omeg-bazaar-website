import { Order } from "@/lib/types/order";


const OrderPaymentInfo = ({ selectedRow }: { selectedRow: Order }) => {
  console.log("from orderpayment", selectedRow);
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg text-gray-700 border-b pb-2 mb-3">
        Payment Information
      </h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500 font-bold">Payment Method</p>
          <p className="text-sm capitalize text-gray-500">
            {selectedRow?.paymentMethod?.replace(/_/g, " ")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-bold">Payment Status</p>
          <p
            className={`text-sm ${
              selectedRow.payment?.status?.toLowerCase() === "success"
                ? "text-green-600"
                : selectedRow.payment?.paymentStatus?.toLowerCase() === "failed"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {selectedRow.payment?.paymentStatus}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-bold">Order Status</p>
          <p
            className={`text-sm ${
              selectedRow.status === "delivered"
                ? "text-green-600"
                : selectedRow.status === "cancelled"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {selectedRow.status}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-bold">Paid</p>
          <p
            className={`text-sm ${
              selectedRow.isPaid ? "text-green-600" : "text-red-600"
            }`}
          >
            {selectedRow.isPaid ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPaymentInfo;

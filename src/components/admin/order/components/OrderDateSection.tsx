import { Order } from "@/lib/types/order";


const OrderDateSection = ({ selectedRow }: { selectedRow: Order}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div>
        <p className="text-gray-500">Order Date</p>
        <p className="font-medium">
          {new Date(selectedRow.createdAt).toLocaleString()}
        </p>
      </div>
      {selectedRow.payment?.paidAt && (
        <div>
          <p className="text-gray-500">Payment Date</p>
          <p className="font-medium">
            {new Date(selectedRow.payment.paidAt).toLocaleString()}
          </p>
        </div>
      )}
      {selectedRow.deliveredAt && (
        <div>
          <p className="text-gray-500">Delivery Date</p>
          <p className="font-medium">
            {new Date(selectedRow.deliveredAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderDateSection;

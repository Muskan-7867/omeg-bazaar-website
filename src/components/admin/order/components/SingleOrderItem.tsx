import { Order } from "@/lib/types/order";
import Image from "next/image";

interface Props {
  selectedRow: Order;
}

const SingleOrderItem = ({ selectedRow }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-gray-700 border-b pb-2">
        Products
      </h3>
      <div className="divide-y">
        {selectedRow.orderItems.map((item, index) => {
          const deliveryCharges = item.product?.deliveryCharges ?? 0;
          const imageUrl =
            item.product?.images?.[0]?.url || "/placeholder.png"; // fallback for Next.js <Image>

          return (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 py-4 items-center text-sm"
            >
              {/* Product Image + Name */}
              <div className="col-span-4 flex items-center gap-3 truncate">
                <Image
                  src={imageUrl}
                  alt={item.product?.name || "Product"}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded-md border"
                />
                <span className="truncate">{item.product?.name}</span>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center">
                <span>₹{item.price.toFixed(2)}</span>
              </div>

              {/* Quantity */}
              <div className="col-span-1 text-center">
                <span>Qty: {item.quantity}</span>
              </div>

              {/* Delivery Charges */}
              <div className="col-span-2 text-center">
                <span>₹{deliveryCharges.toFixed(2)}</span>
              </div>

              {/* Total */}
              <div className="col-span-3 text-right">
                <span>
                  ₹{(item.price * item.quantity + deliveryCharges).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleOrderItem;

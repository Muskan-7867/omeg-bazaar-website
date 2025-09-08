import Image from "next/image";
import { Product } from "../../../../types/Product";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";

interface CartDetailsProps {
  product: Product;
  onDelete: (id: string) => void;
  quantity: number;
  handleChangeQuantity: (id: string, quantity: number) => void;
}
const CartDetails = ({
  product,
  onDelete,
  quantity,
  handleChangeQuantity
}: CartDetailsProps) => {
  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-lg ">
      {/*  Delete Button */}
      <button
        onClick={() => onDelete(product._id)}
        className="absolute top-2 right-2 p-1 text-red-500 hover:text-white hover:bg-red-500 border border-gray-300 rounded-full transition"
        title="Remove item"
        aria-label="Remove item"
      >
        <RxCross2 className="text-base" />
      </button>

      {/* Product Image */}
      <div className="flex justify-center items-center sm:w-[80px]">
        <Image
          src={product.images[0]?.url}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-md"
        />
      </div>

      {/* ℹ Product Info */}
      <div className="flex-1 sm:px-4 space-y-1">
        <h3 className="text-md">{product.name}</h3>
        <div className="text-gray-700 text-sm sm:text-base font-medium flex items-center">
          <LiaRupeeSignSolid />
          {product.price.toFixed(2)}
        </div>
      </div>

      {/* 🔢 Quantity */}
      <div className="flex flex-col items-start sm:items-center gap-1 mr-22">
        <p className="text-sm font-medium">Qty</p>
        <div className="flex gap-8">
          <button
            onClick={() => handleChangeQuantity(product._id, quantity - 1)}
            className="p-2 border border-gray-200 w-14 rounded-sm"
          >
            -
          </button>
          <p className="mt-2">{quantity}</p>
          <button
            onClick={() => handleChangeQuantity(product._id, quantity + 1)}
            className="p-2 border border-gray-200 w-14 rounded-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;

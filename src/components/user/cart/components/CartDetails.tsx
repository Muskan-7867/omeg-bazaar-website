"use client";
import { Product } from "@/lib/types/Product";
import Image from "next/image";
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
    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white  border border-gray-100 w-full">
      {/* Delete Button */}
      <button
        onClick={() => onDelete(product._id)}
        className="absolute top-3 right-3 text-gray-500 hover:text-white hover:bg-red-500 rounded-full p-1 transition"
        title="Remove item"
        aria-label="Remove item"
      >
        <RxCross2 className="text-lg" />
      </button>

      {/* Product Image */}
      <div className="flex justify-center items-center sm:w-[100px]">
        <Image
          src={product.images[0]?.url}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-md"
          height={100}
          width={100}
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 px-2 space-y-2 min-w-0">
        <h3 className="text-sm md:text-base font-medium line-clamp-2">{product.name}</h3>
        <div className="text-gray-800 text-base font-semibold flex items-center">
          <LiaRupeeSignSolid />
          {product.price.toFixed(2)}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium text-gray-600">Qty</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleChangeQuantity(product._id, quantity - 1)}
            className="border border-gray-300 w-8 h-8 rounded-sm flex items-center justify-center hover:bg-gray-100 transition"
            disabled={quantity <= 1}
          >
            -
          </button>
          <p className="text-center text-base font-medium w-6">{quantity}</p>
          <button
            onClick={() => handleChangeQuantity(product._id, quantity + 1)}
            className="border border-gray-300 w-8 h-8 rounded-sm flex items-center justify-center hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
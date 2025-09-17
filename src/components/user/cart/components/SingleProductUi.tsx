"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Product } from "@/lib/types/Product";

interface SingleProductPageProps {
  product: Product;
  quantities: { [id: string]: number };
  setQuantities: React.Dispatch<React.SetStateAction<{ [id: string]: number }>>;
}

export const SingleProductUi: React.FC<SingleProductPageProps> = ({
  product,
  quantities,
  setQuantities
}) => {
  const navigate = useRouter();
  const quantity = quantities[product?._id] || 1;

  const handleChangeQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-lg w-full">
      {/* Left: Image + Name + Qty */}
      <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap w-full sm:w-auto">
        <div className="w-20 h-20 flex-shrink-0">
          <Image
            onClick={() => navigate.push(`/products/${product?._id}`)}
            src={product?.images[0]?.url}
            alt={product?.name}
            className="w-full h-full object-cover rounded-md cursor-pointer"
            width={80}
            height={80}
          />
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-light mb-2">
            {product?.name}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <p className="text-sm font-medium text-center sm:text-left">Qty</p>
            <div className="flex gap-2 justify-center sm:justify-start">
              <button
                onClick={() => handleChangeQuantity(product?._id, quantity - 1)}
                className="p-2 border border-gray-200 w-10 h-10 rounded-sm"
              >
                -
              </button>
              <p className="flex items-center justify-center w-6">{quantity}</p>
              <button
                onClick={() => handleChangeQuantity(product?._id, quantity + 1)}
                className="p-2 border border-gray-200 w-10 h-10  rounded-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Price */}
      <div className="text-gray-700 text-sm sm:text-base font-medium flex items-center">
        <LiaRupeeSignSolid className="mr-1" />
        {product?.price.toFixed(2)}
      </div>
    </div>
  );
};

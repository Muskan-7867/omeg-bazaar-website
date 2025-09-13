import { cookies } from "next/headers";
import { ShoppingBag } from "lucide-react";
import CartDetails from "./CartDetails";
import CartSummary from "./CartSummary";
import { Product } from "@/lib/types/Product";
import Link from "next/link";
import { getCartProducts } from "@/lib/services/api/cartprods";

const CartLayout = async () => {
  // Get cookies on the server
  const cookieStore = await cookies();
  const productIdsCookie = cookieStore.get("productIds");
  const productIds = productIdsCookie ? JSON.parse(productIdsCookie.value) : [];
  const quantitiesCookie = cookieStore.get("quantities");
  const initialQuantities = quantitiesCookie
    ? JSON.parse(quantitiesCookie.value)
    : {};

  // Fetch cart products on the server
  let cartproducts: Product[] = [];
  const isLoading = false;
  let isError = false;

  if (productIds.length > 0) {
    try {
      cartproducts = await getCartProducts(productIds);
    } catch (error) {
      console.error("Failed to fetch cart products:", error);
      isError = true;
    }
  }

  // Handle delete action
  const handleDelete = async (id: string) => {
    "use server";

    const cookieStore = await cookies();
    const productIdsCookie = cookieStore.get("productIds");
    const existing = productIdsCookie ? JSON.parse(productIdsCookie.value) : [];
    const updated = existing.filter((prodId: string) => prodId !== id);

    // Update the cookie
    cookieStore.set("productIds", JSON.stringify(updated));

    // Revalidate the page to show updated cart
    // This would typically be done with revalidatePath or revalidateTag
  };

  // Handle quantity change
  const handleChangeQuantity = async (id: string, quantity: number) => {
    "use server";

    if (quantity < 1) return;

    // Update quantities in cookie
    const cookieStore = await cookies();
    const quantitiesCookie = cookieStore.get("quantities");
    const quantities = quantitiesCookie
      ? JSON.parse(quantitiesCookie.value)
      : {};

    quantities[id] = quantity;

    // Update the cookie
    cookieStore.set("quantities", JSON.stringify(quantities));

    return quantity;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 lg:px-12 mt-12 lg:mt-2">
      <div className="max-w-full lg:px-18 mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="lg:text-3xl text-sm font-light text-gray-800 flex items-center ">
            <ShoppingBag className="w-8 h-8 mr-4  text-green-600" />
            Your Shopping Cart
          </h1>
          {cartproducts.length > 0 && (
            <span className="ml-4 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full hidden lg:block">
              {cartproducts.length}{" "}
              {cartproducts.length === 1 ? "Item" : "Items"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className=" p-2 rounded-2xl ">
              {isLoading ? (
                <div className="w-full flex flex-col items-center justify-center py-12">
                  <div className="w-[18rem] h-[12rem] lg:w-[18rem] lg:h-[18rem] animate-pulse bg-gray-200 rounded-full" />
                  <p className="text-lg font-medium mt-4 text-gray-600">
                    Loading your cart...
                  </p>
                </div>
              ) : cartproducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-32 h-32 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mt-6">
                    Your cart feels lonely
                  </h3>
                  <p className="text-gray-500 mt-2 text-center max-w-md">
                    Add some products to make it happy! Start shopping to find
                    amazing items.
                  </p>
                  <Link
                    href="/products"
                    className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-full transition-colors"
                  >
                    Explore Products
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cartproducts.map((product) => (
                    <li key={product._id}>
                      <CartDetails
                        product={product}
                        quantity={initialQuantities[product._id] || 1}
                        onDelete={handleDelete}
                        handleChangeQuantity={handleChangeQuantity}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {isError && (
                <div className="bg-red-50 p-4 mt-4 rounded-lg border border-red-100">
                  <h3 className="text-red-700 font-medium flex items-center">
                    <span className="mr-2">✕</span>
                    Failed to load cart products
                  </h3>
                  <p className="text-sm text-red-600 mt-1">
                    There was an issue loading your cart items. Please try
                    refreshing the page.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <CartSummary
                products={cartproducts}
                quantities={initialQuantities}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;

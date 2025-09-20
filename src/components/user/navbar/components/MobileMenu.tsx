import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import {
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
  FaStore
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

interface MobileMenuProps {
  isCardVisible: boolean;
  setIsCardVisible: (value: boolean) => void;
  isLoggedIn?: boolean;
  userName?: string;
  categories?: Array<{ _id: string; name: string; slug: string }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isCardVisible,
  setIsCardVisible
}) => {
  const handleClick = () => {
    setIsCardVisible(false);
  };

  const defaultCategories = [
    { _id: "electronics", name: "Electronics", slug: "electronics" },
    { _id: "fashion", name: "Fashion", slug: "Fashion" },
    { _id: "kitchen", name: "Kitchen", slug: "kitchen-products" },
    { _id: "beauty", name: "Health & Care", slug: "health" }
  ];

  return (
    <AnimatePresence>
      {isCardVisible && (
        <>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white text-gray-900 fixed top-0 left-0 z-[110] h-full w-62 sm:w-96 shadow-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-2 border-b border-gray-200">
              <h2 className="font-semibold text-lg">Menu</h2>
              <button
                onClick={() => setIsCardVisible(false)}
                className="text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <RxCross2 size={22} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto text-sm">
              {/* Categories */}
              <div className="px-4 py-2 border border-gray-200">
                <h3 className="font-bold text-lg mb-1">Shop by Category</h3>
                <ul className="space-y-1">
                  {defaultCategories.map((category) => (
                    <li key={category._id}>
                      <Link
                        href={`/products?category=${encodeURIComponent(
                          category.slug
                        )}`}
                        onClick={handleClick}
                        className="flex items-center py-2 hover:text-amazon_orange transition-colors"
                      >
                        <FaStore className="mr-3 text-gray-600" />
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Account */}
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-bold text-lg mb-1">Your Account</h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/cart"
                      onClick={handleClick}
                      className="flex items-center py-2 hover:text-amazon_orange transition-colors"
                    >
                      <FaShoppingCart className="mr-3 text-gray-600" />
                      Your Cart
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Help & Settings */}
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-bold text-lg mb-1">Help & Settings</h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/products"
                      onClick={handleClick}
                      className="block py-2  hover:text-amazon_orange"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      onClick={handleClick}
                      className="block py-2 hover:text-amazon_orange"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      onClick={handleClick}
                      className="block py-2 hover:text-amazon_orange"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-3">Connect With Us</h3>
                <div className="flex gap-4">
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 text-amazon_blue w-10 h-10 rounded-full flex justify-center items-center hover:bg-amazon_blue hover:text-white transition-colors"
                  >
                    <FaFacebook size={18} />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 text-amazon_blue w-10 h-10 rounded-full flex justify-center items-center hover:bg-amazon_blue hover:text-white transition-colors"
                  >
                    <FaInstagram size={18} />
                  </Link>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>omegbazaarofficial@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

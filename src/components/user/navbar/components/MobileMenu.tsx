import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { FaFacebook, FaInstagram,  FaShoppingCart, FaBox, FaStore } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

interface MobileMenuProps {
  isCardVisible: boolean;
  setIsCardVisible: (value: boolean) => void;
  isLoggedIn?: boolean;
  userName?: string;
  categories?: Array<{_id: string; name: string}>; 
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isCardVisible,
  setIsCardVisible,

   categories = []
}) => {
  const handleClick = () => {
    setIsCardVisible(false);
  };

    const defaultCategories = [
    { _id: "electronics", name: "Electronics" },
    { _id: "fashion", name: "Fashion" },
    { _id: "kitchen", name: "Kitchen" },
    { _id: "beauty", name: "Health & Care" }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <AnimatePresence>
      {isCardVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-20 backdrop-blur-xl  bg-opacity-50 mt-8"
            onClick={() => setIsCardVisible(false)}
          />

          {/* Sliding mobile menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white text-gray-900 fixed top-0 right-0 z-[110] h-full w-80 shadow-xl overflow-y-auto "
          >
            {/* Header */}
            <div className="bg-amazon_blue text-gray-700 p-4 flex justify-between items-center">
              {/* <div className="flex items-center">
                {isLoggedIn ? (
                  <>
                    <FaUser className="mr-2" />
                    <span className="text-black">Hello, {userName}</span>
                  </>
                ) : (
                  <Link href="/login" onClick={handleClick} className="font-medium">
                    Login / Sign Up
                  </Link>
                )}
              </div> */}
              <button
                onClick={() => setIsCardVisible(false)}
                className="text-gray-700 p-1 rounded-full  hover:bg-opacity-20 transition-colors"
              >
                <RxCross2 size={22} />
              </button>
            </div>

            {/* Main Navigation */}
           <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-3">Shop by Category</h3>
              <ul className="space-y-2">
                {displayCategories.map((category) => (
                  <li key={category._id}>
                    <Link 
                      href={`/products?category=${encodeURIComponent(category._id)}`} 
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

            {/* Account Section */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-3">Your Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/orders" onClick={handleClick} className="flex items-center py-2 hover:text-amazon_orange transition-colors">
                    <FaBox className="mr-3 text-gray-600" />
                    Your Orders
                  </Link>
                </li>
                <li>
                  <Link href="/cart" onClick={handleClick} className="flex items-center py-2 hover:text-amazon_orange transition-colors">
                    <FaShoppingCart className="mr-3 text-gray-600" />
                    Your Cart
                  </Link>
                </li>
        
                <li>
                  {/* <Link href="/notifications" onClick={handleClick} className="flex items-center py-2 hover:text-amazon_orange transition-colors">
                    <IoNotificationsOutline className="mr-3 text-gray-600" />
                    Notifications
                  </Link> */}
                </li>
              </ul>
            </div>

            {/* Help & Settings */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-3">Help & Settings</h3>
              <ul className="space-y-2">
                        <li>
                  <Link href="/products" onClick={handleClick} className="py-2 block hover:text-amazon_orange transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/about" onClick={handleClick} className="py-2 block hover:text-amazon_orange transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={handleClick} className="py-2 block hover:text-amazon_orange transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { FaFacebook, FaInstagram, FaUser, FaShoppingCart, FaHeart, FaBox, FaStore } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import {  IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";

interface MobileMenuProps {
  isCardVisible: boolean;
  setIsCardVisible: (value: boolean) => void;
  isLoggedIn?: boolean;
  userName?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isCardVisible,
  setIsCardVisible,
  isLoggedIn = false,
  userName = "User"
}) => {
  const handleClick = () => {
    setIsCardVisible(false);
  };

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
              <div className="flex items-center">
                {isLoggedIn ? (
                  <>
                    <FaUser className="mr-2" />
                    <span>Hello, {userName}</span>
                  </>
                ) : (
                  <Link href="/login" onClick={handleClick} className="font-medium">
                    Login / Sign Up
                  </Link>
                )}
              </div>
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
                <li>
                  <Link href="/electronics" onClick={handleClick} className="flex items-center py-2 hover:text-amazon_orange transition-colors">
                    <FaStore className="mr-3 text-gray-600" />
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/fashion" onClick={handleClick} className="flex items-center py-2 hover:text-amazon_orange transition-colors">
                    <FaUser className="mr-3 text-gray-600" />
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/home" onClick={handleClick} className="flex items-center py-2 hover:text-amazon_orange transition-colors">
                    <FaStore className="mr-3 text-gray-600" />
                    Home & Kitchen
                  </Link>
                </li>
                <li>
                  <Link href="/beauty" onClick={handleClick} className="flex items-center py-2 hover:text-amazon_orange transition-colors">
                    <FaHeart className="mr-3 text-gray-600" />
                    Beauty & Health
                  </Link>
                </li>
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
                  <Link href="/notifications" onClick={handleClick} className="flex items-center py-2 hover:text-amazon_orange transition-colors">
                    <IoNotificationsOutline className="mr-3 text-gray-600" />
                    Notifications
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help & Settings */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-3">Help & Settings</h3>
              <ul className="space-y-2">
            
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
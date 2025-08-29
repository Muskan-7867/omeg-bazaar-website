"use client";
import { IoMenu } from "react-icons/io5";
import { BsCartPlus, BsSearch } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";
import Cookies from "js-cookie";
import { motion, useMotionValueEvent } from "framer-motion";
import { useScroll } from "framer-motion";
import useCartStore from "@/store/Cart/Cart.store";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { debounce } from "lodash";

const Navbar = () => {
  const router = useRouter();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [showSearchBar, setShowSearchBar] = useState(false);
  const location = usePathname();
  const isHomePage = location === "/";
  const { cartCountValue } = useCartStore();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { currentUserFromStore, allocateCurrentUser } = useCurrentUser();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous! && latest > 800) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const data = localStorage.getItem("productIds");
    const array = data ? JSON.parse(data) : [];
    setCartCount(array.length);
  }, [cartCountValue]);

  // Debounced search function
  const handleSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }, 500),
    []
  );

  useEffect(() => {
    handleSearch(searchQuery);
    return () => {
      handleSearch.cancel();
    };
  }, [searchQuery, handleSearch]);

  const getFirstLetter = (email: string | null | undefined) => {
    if (!email) return "";
    return email.charAt(0).toUpperCase();
  };

  const handleLogOut = () => {
    Cookies.remove("authToken");
    allocateCurrentUser(null);
    localStorage.removeItem("user");
    setIsDropdownVisible(false);
    router.push("/login");
  };

  const hasValidUser = currentUserFromStore?.email;

  return (
    <div className="relative">
      {/* Top announcement bar */}
      <div className="bg-gray-800 text-white text-xs py-1 px-4 text-center">
        Free shipping on orders over $50!
      </div>

      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`w-full flex flex-col fixed top-0 left-0 right-0 z-[100] bg-white shadow-md ${
          isHomePage ? "text-primary" : "text-primary"
        }`}
      >
        {/* Main nav bar */}
        <div className="h-14 flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Logo and menu button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsCardVisible(true)}
              className="lg:hidden flex justify-center items-center mr-2 text-gray-700 hover:text-primary"
              aria-label="Open Mobile Menu"
            >
              <IoMenu className="w-6 h-6" />
            </button>

            <Link
              href="/"
              className="font-serif text-xl sm:text-2xl lg:text-3xl flex items-center"
            >
              <Image
                width={35}
                height={40}
                src="/logos/blacklogo.png"
                className="h-8 mr-2"
                alt="Company Logo"
                priority
              />
              {/* <span className="hidden sm:inline">Omeg-Bazaar</span> */}
            </Link>
          </div>

          {/* Desktop Search Bar with NavLinks to the right */}
          <div className="hidden md:flex flex-1 items-center max-w-6xl mx-8">
            <div className="flex w-full ">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-grow px-4 py-2 text-gray-700 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-primary  text-white px-4 py-2 rounded-r-md"
                aria-label="Search"
              >
                <BsSearch className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right side section */}
          <div className="flex items-center lg:gap-8 gap-4">
            {/* Navigation links (only show on large screens) */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
              <Link href="/products" className="hover:text-primary">
                Products
              </Link>
              <Link href="/contact" className="hover:text-primary">
                Contact Us
              </Link>
            </div>

            {/* User account */}
            {hasValidUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                  className="flex items-center hover:text-gray-600"
                  title="Profile"
                  aria-label="User Profile"
                >
                  <span className="hidden sm:inline mr-1 text-sm">
                    Hello,{" "}
                    {currentUserFromStore.username?.split(" ")[0] || "User"}
                  </span>
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 font-semibold text-sm">
                    {getFirstLetter(currentUserFromStore.email)}
                  </div>
                </button>
                {isDropdownVisible && (
                  <ProfileDropdown
                    isDropdownVisible={isDropdownVisible}
                    setIsDropdownVisible={setIsDropdownVisible}
                    userEmail={currentUserFromStore.email}
                    handleLogOut={handleLogOut}
                  />
                )}
              </div>
            ) : (
              <Link
                href="/auth/register"
                className="flex items-center hover:text-gray-600"
                aria-label="Login"
              >
                <span className="hidden sm:inline mr-1 text-sm">Sign Up</span>
                <FaUserPlus className="w-6 h-6" />
              </Link>
            )}

            {/* Cart button */}
            <button
              className="hover:text-gray-600 transition-opacity relative flex items-center"
              aria-label="Cart"
              onClick={() => router.push("/cart")}
            >
              <span className="hidden sm:inline mr-1 text-sm">Cart</span>
              <div className="relative">
                <p className="bg-red-600 w-5 h-5 rounded-full flex justify-center items-center text-xs text-white absolute -top-2 -right-2">
                  {cartCount}
                </p>
                <BsCartPlus className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Toggleable on mobile */}
        {/* {showSearchBar && (
          <div className="md:hidden px-4 py-2 bg-white border-t border-gray-200">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-r-md"
                onClick={() => setShowSearchBar(false)}
                aria-label="Search"
              >
                <BsSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
        )} */}
      </motion.div>

      {/* Mobile search button */}
      {/* <button
        className="md:hidden fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setShowSearchBar(!showSearchBar)}
        aria-label="Toggle search"
      >
        <BsSearch className="w-6 h-6" />
      </button> */}

      {/* Mobile Menu */}
      <MobileMenu
        isCardVisible={isCardVisible}
        setIsCardVisible={setIsCardVisible}
      />
    </div>
  );
};

export default Navbar;

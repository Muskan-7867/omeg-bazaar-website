"use client";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Package } from "lucide-react";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaTimes, FaUser } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";

type OptionTypes = {
  href: string;
  title: string;
  Icon: ReactElement;
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const SidebarOptions: OptionTypes[] = [
    { title: "Dashboard", href: "/admin/dashboard", Icon: <MdDashboard size={20} /> },
    { title: "Products", href: "/admin/products", Icon: <Package size={20} /> },

    { title: "Category", href: "/admin/category", Icon: <TbCategoryPlus size={20} /> },
    { title: "Orders", href: "/admin/order", Icon: <TiShoppingCart size={20} /> },

    {
      title: "Customers",
      href: "/admin/customers",
      Icon: <LiaUserFriendsSolid size={22} />
    },
    { title: "Profile", href: "/admin/adminprofile", Icon: <FaUser size={22} /> }
  ];

  return (
    <>
      {/*  toggle button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-primary rounded-md shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FaTimes size={18} className="text-white" />
        ) : (
          <FaArrowRightLong size={18} className="text-white" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} w-[18rem] py-4`}
      >
        {/* Top bar with logo */}
        <div className="w-full flex items-end justify-center  font-bold font-serif px-4 mt-2 ml-2">
          <h1 className="text-primary text-2xl font-betweenbold">
            Omeg Bazaar
          </h1>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col space-y-4 mt-18 mb-4 px-2 ">
          {SidebarOptions.map((option) => {
            // In Sidebar component
            const isActive = pathname.includes(option.href);
            return (
              <Link
                key={option.title}
                href={option.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-primary/80 text-white font-bold"
                    : "hover:bg-gray-50 hover:text-primary text-[#333333]"
                }`}
              >
                <div className="mr-6">{option.Icon}</div>
                <span className="text-md">{option.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

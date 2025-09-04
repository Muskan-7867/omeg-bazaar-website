"use client"
import Link  from "next/link";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getAdminQuery } from "@/services/queries";

const Header: React.FC = () => {
  const token = Cookies.get("admintoken");
  const { data, isLoading } = useQuery(getAdminQuery(!!token));

  const getFirstLetter = (email: string) =>
    email?.charAt(0).toUpperCase() || "";

  return (
    <div className="h-18 bg-white">
      <div className="m-4 flex justify-end lg:gap-4 items-center">
        {!token && (
          <Link
            href="/adminregister"
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </Link>
        )}

        {token && data?.admin && (
          <Link
            href="adminprofile"
            className="flex flex-col items-center ml-4 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border-4 border-primary flex items-center justify-center text-primary font-bold">
              {!isLoading && data?.admin?.email
                ? getFirstLetter(data.admin.email)
                : "M"}
            </div>
            <p className="text-xs mt-1 text-gray-700 text-center">
              {!isLoading && data?.admin?.name ? data.admin.name : "Admin"}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

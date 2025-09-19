"use client";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";

export default function UserDropdown({
  user
}: {
  user: { email: string; username?: string } | null;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogOut = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("user");
    setOpen(false);
    router.push("/auth/login");
  };

  if (!user) {
    return (
      <button
        onClick={() => router.push("/auth/register")}
        className="hover:text-gray-600"
      >
        <FaUserPlus className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center hover:text-gray-600"
      >
        {/* <span className="hidden sm:inline mr-1 text-sm">
          Hello, {user.username?.split(" ")[0] || "User"}
        </span> */}
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 font-semibold text-sm">
          {user.email.charAt(0).toUpperCase()}
        </div>
      </button>
      {open && (
        <ProfileDropdown
          isDropdownVisible={open}
          setIsDropdownVisible={setOpen}
          userEmail={user.email}
          handleLogOut={handleLogOut}
        />
      )}
    </div>
  );
}

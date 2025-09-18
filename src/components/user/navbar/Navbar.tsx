import Link from "next/link";
import Image from "next/image";
import MobileMenuButton from "./components/MobileMenuButton";
import UserDropdown from "./components/UserDropdown";
import CartCount from "./components/CartCount";
import { cookies } from "next/headers";
import { fetchCurrentUser } from "@/lib/services/api/fetchers";

export default async function Navbar() {
 
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value || null;

  let user: { email: string; username?: string; firstLetter?: string } | null =
    null;

  if (token) {
    try {
      const currentUser = await fetchCurrentUser(token);
      if (currentUser) {
        user = {
          email: currentUser.email,
          username: currentUser.username,
          firstLetter: currentUser.email.charAt(0).toUpperCase()
        };
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <div className="w-full flex flex-col fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm shadow-black/10 text-gray-800 " >
      <div className="h-14 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-6">
        {/* Left - Logo & Mobile menu */}
        <div className="flex items-center">
          <MobileMenuButton />
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
          </Link>
        </div>

        {/* Center - Nav Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-800">
            Products
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact Us
          </Link>
        </div>

        {/* Right - User & Cart */}
        <div className="flex items-center lg:gap-8 gap-4">
          <UserDropdown user={user} />
          <CartCount />
        </div>
      </div>
    </div>
  );
}

"use client";
import Header from "@/components/admin/common/Header";
import Sidebar from "@/components/admin/common/Sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("admintoken");
    if (!token) {
      // If no token and not already on login page, redirect to login
      if (!pathname.startsWith("/admin/auth")) {
        router.push("/admin/auth/login");
      }
      setIsAuthenticated(false);
      setIsLoading(false);
    } else {
      setIsAuthenticated(true);
      
      // Redirect from root admin path to dashboard
      if (pathname === "/admin") {
        router.push("/admin/dashboard");
      }
      
      // If on auth pages but authenticated, redirect to dashboard
      if (pathname.startsWith("/admin/auth")) {
        router.push("/admin/dashboard");
      } else {
        setIsLoading(false);
      }
    }
  }, [pathname, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and on an auth page, show the auth content
  if (!isAuthenticated && pathname.startsWith("/admin/auth")) {
    return <>{children}</>;
  }

  // If not authenticated and not on auth page, don't render anything (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Render the admin layout only if authenticated
  return (
    <div className="flex h-screen w-full bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Right panel */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 ">
          {children}
        </main>
      </div>
    </div>
  );
}
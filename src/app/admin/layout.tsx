"use client";

import Header from "@/components/admin/common/Header";
import Sidebar from "@/components/admin/common/Sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect if the user is exactly at /admin
    if (pathname === "/admin") {
      router.push("/admin");
    }
  }, [pathname, router]);

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Right panel */}
      <div className="flex flex-col flex-1 overflow-hidden ">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}

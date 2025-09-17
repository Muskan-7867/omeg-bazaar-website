import DemoOne from "@/components/user/footer/FooterTwo";
import CategoryNavbar from "@/components/user/navbar/components/CategoryNavbar";
import Navbar from "@/components/user/navbar/Navbar";
import React from "react";

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <Navbar />
      <CategoryNavbar />
      {children}
      <DemoOne />
    </div>
  );
}
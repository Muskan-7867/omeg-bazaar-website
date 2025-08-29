import NewFooter from "@/components/user/footer/NewFooter";
import Navbar from "@/components/user/navbar/Navbar";
import React from "react";

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      {children}
      <NewFooter />
    </div>
  );
}
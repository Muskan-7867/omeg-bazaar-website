"use client";
import { Truck, ShoppingBasket, Headphones, Smartphone } from "lucide-react";
import Link from "next/link";

export default function InfoBar() {
  const items = [
    {
      icon: <Truck className="lg:w-10 lg:h-10 w-6 h-6 text-primary" />,
      title: "Free Delivery",
      subtitle: "To Your Door"
    },
    {
      icon: <ShoppingBasket className="lg:w-10 lg:h-10 w-6 h-6 text-primary" />,
      title: "Local Pickup",
      subtitle: (
        <>
          Check Out <Link href="#">Locations</Link>
        </>
      )
    },
    {
      icon: <Headphones className="lg:w-10 lg:h-10 w-6 h-6 text-primary" />,
      title: "Available for You",
      subtitle: (
        <>
          <Link href="#">Online Support</Link> 24/7
        </>
      )
    },
    {
      icon: <Smartphone className="lg:w-10 lg:h-10 w-6 h-6 text-primary" />,
      title: "Order on the Go",
      subtitle: (
        <>
          <Link href="https://play.google.com/store/apps/details?id=com.omtel.omeg_bazaar">
            Download Our App
          </Link>
        </>
      )
    }
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
        {items.map((item, i) => (
          <div
            key={i}
            className="
              flex flex-col items-center 
              text-center
              gap-2 px-4
              border-b sm:border-b-0 border-gray-300
              pb-4 sm:pb-0
            "
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <h3 className="font-semibold lg:text-lg text-sm text-black">{item.title}</h3>
              <p className="lg:text-sm text-xs text-gray-600">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

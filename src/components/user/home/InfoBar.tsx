
import Link from "next/link";
import { CiDeliveryTruck, CiShoppingBasket } from "react-icons/ci";
import { PiHeadphonesLight, PiPhoneCallLight } from "react-icons/pi";

export default function InfoBar() {
  const items = [
    {
      icon: <CiDeliveryTruck className="lg:w-10 lg:h-10 w-6 h-6 font-thin text-primary" />,
      title: "Free Delivery",
      subtitle: "to your door"
    },
    {
      icon: <CiShoppingBasket className="lg:w-10 lg:h-10 w-6 h-6 text-primary" />,
      title: "Local Pickup",
      subtitle: (
        <>
          check out <Link href="#">locations</Link>
        </>
      )
    },
    {
      icon: <PiHeadphonesLight className="lg:w-10 lg:h-10 w-6 h-6 text-primary" />,
      title: "Available for You",
      subtitle: (
        <>
          <Link href="#">online support</Link> 24/7
        </>
      )
    },
    {
      icon: <PiPhoneCallLight className="lg:w-10 lg:h-9 w-6 h-6 text-primary" />,
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
    <section className="w-full bg-white py-4 sm:py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-14">
        {items.map((item, i) => (
          <div
            key={i}
            className="
              flex flex-col items-center 
              text-center
              gap-2 px-4
              border-b sm:border-b-0 border-gray-300
              pb-2 sm:pb-0
            "
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <h3 className="font-thin lg:text-lg text-xs text-black">{item.title}</h3>
              <p className="lg:text-xs text-[9px] text-gray-600">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

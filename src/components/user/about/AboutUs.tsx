
import {AboutImageSection} from "./components/AboutImageSection";
import {AboutMission} from "./components/AboutMission";
import { AboutValue } from "./components/AboutValue";
import Link from "next/link";

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto">
        <AboutImageSection />

        {/* Mission section */}
        <AboutMission />

        {/* Value section */}
        <AboutValue />

        {/* Stats section - common in e-commerce sites */}
        <div className="bg-[#EAEDED] py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#131921] text-center mb-10">
              Why Choose Omeg Bazaar?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "10K+", label: "Happy Customers" },
                { number: "5K+", label: "Products" },
                { number: "100+", label: "Categories" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded shadow-sm text-center"
           
                >
                  <div className="text-3xl font-bold text-[#131921]">
                    {stat.number}
                  </div>
                  <div className="text-[#555] mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="max-w-3xl mx-auto text-center py-16 px-4"
       
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#131921] mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-[#555] mb-8 max-w-2xl mx-auto">
            Discover why thousands of customers trust Omeg Bazaar for their
            shopping needs.
          </p>
          <Link href={"/products"}>
            <button
              className="px-8 py-3 bg-[#FF9900] hover:bg-[#e88a00] text-white rounded-md text-lg font-medium transition-colors shadow-lg cursor-pointer"
          
            >
              Start Shopping Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};


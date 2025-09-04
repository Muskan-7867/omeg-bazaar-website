"use client"
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { fetchOrdersQuery, fetchUsersQuery } from "../../../services/queries";
import { Order } from "@/types/order";
import InsightCard from "../common/InsightCard";
import Insightgraph from "../common/Insightgraph";
import { getMonthlySummary } from "@/lib/utills/InsightData";


const Dashboard: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: orders = [] } = useQuery(fetchOrdersQuery());
  const { data: users } = useQuery(fetchUsersQuery());

  // Filter valid orders (paid online or COD)
  const validOrders = orders.filter((order: Order) => {
    const paymentMethod = 
      order.paymentMethod?.toLowerCase() || 
      order.payment?.paymentMethod?.toLowerCase();
    
    if (paymentMethod === "cod" || paymentMethod === "cash_on_delivery") {
      return true; // Count all COD orders
    }
    
    // For online payments, check if payment was successful
    const paymentStatus = 
      order.payment?.paymentStatus?.toLowerCase() || 
      order.payment?.status?.toLowerCase();
    
    return paymentStatus === "success" || order.isPaid;
  });

  const totalOrders = validOrders.length;
  const totalPayment = validOrders.reduce((sum: number, order: Order) => {
    return sum + (order.totalPrice || 0);
  }, 0);

  const insights = [
    {
      title: "Total Orders",
      value: `${totalOrders}`,
      subtitle: "This Month",
      isPositive: false
    },
    {
      title: "Total Amount (In Rupees)",
      value: `₹${totalPayment.toLocaleString("en-IN")}/-`,
      subtitle: "This Month",
      isPositive: true
    },
    {
      title: "Total Users",
      value: `${users?.length}`,
      subtitle: "",
      isPositive: false
    }
  ];

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const monthlySummary = getMonthlySummary(validOrders, users || []);
  
  return (
    <div className="min-h-screen mt-16 bg-white border border-gray-100 py-2 pl-8">
      {/* Insights Section */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide mt-2"
        >
          {insights.map((insight, index) => (
            <InsightCard
              key={index}
              title={insight.title}
              value={insight.value}
              subtitle={insight.subtitle}
              isPositive={insight.isPositive}
            />
          ))}
        </div>

        <div className="absolute right-4 flex gap-4">
          <button className="rounded-full mt-4" onClick={scrollLeft}>
            <span className="text-2xl font-bold text-gray-700">
              <CircleChevronLeft />
            </span>
          </button>
          <button className="rounded-full mt-4" onClick={scrollRight}>
            <span className="text-2xl font-bold text-gray-700">
              <CircleChevronRight />
            </span>
          </button>
        </div>
      </div>

      {/* Orders Section */}
      <h2 className="text-xl font-medium text-[#122539] mt-10 mb-8">Orders</h2>

      {/* Insight Graph Section */}
      <div className="mb-8 mr-8">
        <Insightgraph data={monthlySummary} />
      </div>
    </div>
  );
};

export default Dashboard;
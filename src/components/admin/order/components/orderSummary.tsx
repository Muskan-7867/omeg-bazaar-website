import React from "react";

import { CgToday } from "react-icons/cg";
import { MdCalendarMonth, MdSummarize } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import Summary from "../../common/Summary";
import { fetchOrdersQuery } from "@/lib/services/api/queries";

interface Payment {
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  amount: number;
}

interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  paymentMethod?: string;
  payment: Payment;
}

const OrderSummary: React.FC = () => {
  const { data: orders = [] } = useQuery<Order[]>(fetchOrdersQuery());

  // Get current date and month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const todayString = today.toISOString().split("T")[0];

  // Filter valid orders (paid online or COD)
  const validOrders = orders.filter((order) => {
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

  // Calculate summary data using only valid orders
  const todaysOrders = validOrders.filter((order) => {
    const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
    return orderDate === todayString;
  }).length;

  const monthsOrders = validOrders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear
    );
  }).length;

  const totalOrders = validOrders.length;

  const totalPayment = validOrders.reduce((sum, order) => {
    return sum + (order.totalPrice || 0);
  }, 0);

  const bookingData = [
    { title: "Today's orders", amount: todaysOrders.toString(), icon: CgToday },
    {
      title: "Month's orders",
      amount: monthsOrders.toString(),
      icon: MdCalendarMonth
    },
    {
      title: "Total orders",
      amount: totalOrders.toString(),
      icon: MdSummarize
    },
    {
      title: "Total Payment",
      amount: `₹ ${totalPayment.toFixed(2)}`,
      icon: RiSecurePaymentFill
    }
  ];

  return <Summary data={bookingData} />;
};

export default OrderSummary;
import { CurrentUser } from "../types/auth";
import { Order } from "../types/order";



export const getMonthlySummary = (orders: Order[], users: CurrentUser[]) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const currentYear = new Date().getFullYear();

  return months.map((month, index) => {
    const ordersThisMonth = orders.filter((order) => {
      if (!order.createdAt) return false;
      const date = new Date(order.createdAt);
      return date.getMonth() === index && date.getFullYear() === currentYear;
    });

    const usersThisMonth = users.filter((user) => {
      if (!user.createdAt) return false;
      const date = new Date(user.createdAt);
      return date.getMonth() === index && date.getFullYear() === currentYear;
    });

    const amountThisMonth = ordersThisMonth.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0
    );

    return {
      month,
      monthlyUsers: usersThisMonth.length,
      orders: ordersThisMonth.length,
      amount: amountThisMonth
    };
  });
};


import { PaymentType } from "@/components/user/cart/components/CartSummary";
import { Product } from "./Product";

export interface ProductImage {
  url: string;
}

// export interface Product {
//   name: string;
//   deliveryCharges: number;
//   images: ProductImage[];
//   // Add more fields as needed
// }

export interface OrderItem {
  product: Product;
  price: number;
  quantity: number;
}

export interface Payment {
  status: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paidAt?: string;
}

export interface Order {
  _id: string;
  quantity: number;
  totalPrice: number;
  status: string;
  isPaid: boolean;
  deliveryCharges: number;
  payment: Payment;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
  deliveredAt: string;
  paymentMethod: PaymentType;

}


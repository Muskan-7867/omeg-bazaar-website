
import { PaymentType } from "@/components/user/cart/components/CartSummary";
import { AddressFormData } from "./auth";

export type ProductImage = {
  url: string;
  publicId?: string;
  _id?: string | number;
};

export type ProductVideo = {
  url: string;
  publicId?: string;
  _id?: string | number;
};

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  slug:string;
  features?: string;
  rating?: number;
  originalPrice?: number;
  reviews: number;
  inStock: boolean;
  images: ProductImage[];
  videos?: ProductVideo[];
  category: string;
  [key: string]: unknown;
  quantity: number;
  totalProduct: number;
  deliveryCharges: number;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  products: Product[];
}

export type CategoryType = {
  _id: string;
  name: string;
  description?: string;
  images: ProductImage[];
  approved: boolean;
};

// types/product.ts
export interface ProductFormData {
  name: string;
  description: string;
  features: string;
  price: number | string;
  rating: number | string;
  inStock: string | number | readonly string[] | undefined;
  category: string;
  images?: FileList;
}

export interface CategoryFormData {
  _id?: string;
  name: string;
  description: string;
  image?: FileList;
  products: string[];
}

export interface EditProductData {
  name: string;
  description: string;
  features: string;
  slug: string;
  price: number | string;
  inStock: boolean;
  category: string;
  deliveryCharges: number;
}

export interface OrderItem {
  product: string | Product;
  price: number;
  quantity: number;
}

export interface payment {
  status: string;
  paymentMethod: string;
  paymentStatus: string;
}

export interface OrderData {
  _id?: string;
  quantity: number;
  totalQuantity: number;
  totalPrice: number;
  expectedDeliveryDate: Date;
  address: AddressFormData | undefined;
  orderItems: {
    product: string;
    price: number;
    quantity: number;
  }[];
  status: string;
  deliveryCharges: number;
  payment: PaymentType;
  isPaid: boolean;
  paymentMethod?: string;
}

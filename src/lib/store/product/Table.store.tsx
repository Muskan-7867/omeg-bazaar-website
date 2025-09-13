import { Order } from "@/lib/types/order";
import { Product } from "@/lib/types/Product";
import { create } from "zustand";

interface OrderTableType<T> {
  selectedRow: T | null;
  setSelectedRow: (row: T) => void;
  showSingleOrder: boolean;
  setShowSingleOrder: (show: boolean) => void;
}


interface TableType<T> {
  selectedProduct: T | null;
  setSelectedProduct: (row: T) => void;
  showSingleProduct: boolean;
  setShowSingleProduct: (show: boolean) => void;
  editProduct: boolean;
  setEditProduct: (edit: boolean) => void;
}

export const useSingleProductStore = create<TableType<Product>>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (row) => set({ selectedProduct: row }),

  showSingleProduct: false,
  setShowSingleProduct: (show) => set({ showSingleProduct: show }),
  editProduct: false,
  setEditProduct: (edit) => set({ editProduct: edit })
}));

export const useSingleOrderStore = create<OrderTableType<Order>>((set) => ({
  selectedRow: null,
  setSelectedRow: (row) => set({ selectedRow: row }),
  showSingleOrder: false,
  setShowSingleOrder: (show) => set({ showSingleOrder: show })
}));

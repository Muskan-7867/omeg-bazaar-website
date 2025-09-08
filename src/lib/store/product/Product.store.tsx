import { create } from 'zustand';
import {  OrderData, Product } from '../../types/Product';

type categoryType = {
    selectedCategory : string | null;
    setSelectedCategory: (category: string) => void;
}

type SingleProductType = {
    singleProduct: Product | null;
    setSingleProduct: (product: Product) => void;
}

type SingleRowType = {
    singleRow: OrderData | null;
    setSingleRow: (order: OrderData) => void;
}



export const useCategoryStore = create<categoryType>((set) => ({
    selectedCategory: null,
    setSelectedCategory: (category) => set({ selectedCategory: category }),
  }));
 

export const useSingleProduct = create<SingleProductType>((set) => ({
  singleProduct: null,
  setSingleProduct: (product) => set({ singleProduct: product }),
 
})) ;

export const useSingleOrder = create<SingleRowType>((set) => ({
  singleRow: null,
  setSingleRow: (row) => set({ singleRow: row }),
 
})) ;




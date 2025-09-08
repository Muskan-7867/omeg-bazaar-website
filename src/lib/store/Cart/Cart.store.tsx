import { create } from "zustand";

type CartType = {
  cartCountValue: number;
  increaseCartCount: () => void;
  decreaseCartCount: () => void;
};

const useCartStore = create<CartType>()((set) => ({
  cartCountValue: 0,
  increaseCartCount: () => set((state) => ({ cartCountValue: state.cartCountValue + 1 })),
  decreaseCartCount: () => set((state) => ({ cartCountValue: state.cartCountValue - 1 }))

}));

export default useCartStore;

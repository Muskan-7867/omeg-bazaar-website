
import { CurrentUser } from "@/lib/types/auth";
import { create } from "zustand";


export type userStore = {
  currentUserFromStore: CurrentUser | null;
  setCurrentUserForStore: (user: CurrentUser | null ) => void;
  isLoggined: boolean;
  setIsLoggined: (state: boolean) => void;
  fetch: boolean;
  reFetch: () => void;
};

const useCurrentUserStore = create<userStore>()((set, get) => ({
  currentUserFromStore: {
    email: "",
    username: "",
    _id: "",
    contact: "",
    role: "user",
    address: "",
    order: []
  },
  setCurrentUserForStore: (user) => set({ currentUserFromStore: user }),
  isLoggined: false,
  setIsLoggined: (state) => set({ isLoggined: state }),
  fetch: false,
  reFetch: () => set({ fetch: !get().fetch })
}));

export default useCurrentUserStore;

import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null, // logged-in user info
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));
  
export default useAuthStore;

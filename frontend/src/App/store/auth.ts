import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  currentUserId?: string;
  setCurrentUserId: (currentUserId: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  currentUserId: undefined,
  setCurrentUserId: (currentUserId: string) => set({ currentUserId }),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/api/hook/auth/schema";
import { logoutAction } from "@/api/actions/userAction";

type AuthState = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: async () => {
        await logoutAction();
        set({ user: null });
      },
    }),
    { name: "auth-storage" }
  )
);

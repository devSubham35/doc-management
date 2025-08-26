import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/api/hook/auth/schema";

type AuthState = {

  user: User | null;
  isAuthenticated: boolean;

  // actions
  login: (userData: User) => void;
  logout: () => Promise<void>;
  setProfile: (userData: User) => void;
};

import nookies from "nookies";
import { constant } from "@/lib/constant";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (userData) => {
        set({ user: userData, isAuthenticated: true });
      },

      logout: async () => {
        try {
          // Destroy cookie
          nookies.destroy(null, constant.DOC_ACCESS_TOKEN);

        } catch (err) {
          console.error("Logout error:", err);
        } finally {
          // Reset Zustand state
          set({ user: null, isAuthenticated: false });
        }
      },

      setProfile: (userData) => set((state) => ({ ...state, user: userData })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

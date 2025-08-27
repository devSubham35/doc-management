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
import { redirect } from "next/navigation";
import { PAGE_PATHS } from "@/lib/routes/PageRoutes";

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
          nookies.destroy(null, constant.DOC_ACCESS_TOKEN, { path: "/" });
          useAuthStore.persist.clearStorage();
          redirect(PAGE_PATHS.auth.signIn)
        } catch (err) {
          console.error("Logout error:", err);
        } finally {
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

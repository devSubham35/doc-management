"use client"

import Link from "next/link";
import ProfileMenu from "../ProfileMenu";
import { ThemeToggler } from "../ThemeToggler";
import { Button } from "@/components/ui/button";
import { NavigationSheet } from "./navigation-sheet";
import { useAuthStore } from "@/stores/useAuthStore";
import { PAGE_PATHS } from "@/lib/routes/PageRoutes";

const Navbar = () => {

  const { user, logout } = useAuthStore();

  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between p-6">
        <div className="flex items-center gap-8">
          <Link href="/">
            <h1 className="text-xl font-bold">EDoc</h1>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <ProfileMenu user={user} logout={logout} />
          ) : (
            <>
              <Link href={PAGE_PATHS.auth.signIn}>
                <Button variant="outline" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
              <Link href={PAGE_PATHS.auth.signUp}>
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
          <ThemeToggler />
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

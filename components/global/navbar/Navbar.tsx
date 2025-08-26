"use client"

import Link from "next/link";
import { NavMenu } from "./nav-menu";
import ProfileMenu from "../ProfileMenu";
import { Logo } from "@/public/icons/logo";
import { navRoutes } from "@/lib/navRoutes";
import { ThemeToggler } from "../ThemeToggler";
import { Button } from "@/components/ui/button";
import { NavigationSheet } from "./navigation-sheet";
import { useAuthStore } from "@/stores/useAuthStore";

const Navbar = () => {

  const user = useAuthStore((s) => s.user);
  console.log(user, "++66")

  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between custom-container">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo />
          </Link>
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <>
              <Link href={navRoutes?.auth?.signIn}>
                <Button variant="outline" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
              <Link href={navRoutes?.auth?.signUp}>
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

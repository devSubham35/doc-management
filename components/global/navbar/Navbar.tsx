import Link from "next/link";
import { NavMenu } from "./nav-menu";
import { Logo } from "@/public/icons/logo";
import { navRoutes } from "@/lib/navRoutes";
import { ThemeToggler } from "../ThemeToggler";
import { Button } from "@/components/ui/button";
import { NavigationSheet } from "./navigation-sheet";


const Navbar = () => {
  return (
    <>
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Logo />
            </Link>
            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>
          <div className="flex items-center gap-3">
            <Link href={navRoutes?.auth?.signIn}>
              <Button variant="outline" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link href={navRoutes?.auth?.signUp}>
              <Button>Sign Up</Button>
            </Link>
            <ThemeToggler />
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
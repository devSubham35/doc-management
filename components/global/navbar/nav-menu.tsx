import Link from "next/link";
import { PAGE_PATHS } from "@/lib/routes/PageRoutes";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";


export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href={PAGE_PATHS.clinician.dashboard.root}>root</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href={PAGE_PATHS.clinician.dashboard.submissions}>Submission Table</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
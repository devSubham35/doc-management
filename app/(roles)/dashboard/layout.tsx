"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Home, Table } from "lucide-react";
import { usePathname } from "next/navigation";
import { PAGE_PATHS } from "@/lib/routes/PageRoutes";

// sidebar menu config
const menuItems = [
  { label: "Dashboard", href: PAGE_PATHS.clinician.dashboard.root, icon: Home },
  { label: "Submission Table", href: PAGE_PATHS.clinician.dashboard.submissions, icon: Table },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] border-r bg-background p-4">
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          let active = false;

          if (item.href === PAGE_PATHS.clinician.dashboard.root) {
            active = pathname === item.href;
          } else {
            active = pathname.startsWith(item.href);
          }

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-4 text-base font-medium transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;

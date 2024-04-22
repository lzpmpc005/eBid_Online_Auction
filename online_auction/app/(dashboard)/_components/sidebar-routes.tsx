"use client";

import { Layout, Compass, List, BarChart } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Explore",
    href: "/search",
  },
];

const sellerRoutes = [
  {
    icon: List,
    label: "Auctions",
    href: "/seller/auctions",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/seller/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const issellerPage = pathname?.includes("/seller");
  const routes = issellerPage ? sellerRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

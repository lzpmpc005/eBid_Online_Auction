"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { UserButton, Profile } from "@/components/common";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const isSellerPage = pathname?.startsWith("/seller");
  const isBuyerPage = pathname?.startsWith("/auction");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block pl-60">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isSellerPage || isBuyerPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/seller/auctions">
            <Button size="sm" variant="ghost">
              Seller Mode
            </Button>
          </Link>
        )}
        {/* <Profile /> */}
        <Button size="sm" variant="ghost">
          <UserButton />
        </Button>
      </div>
    </>
  );
};

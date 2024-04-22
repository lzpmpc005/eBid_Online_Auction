"use client";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { NavLink } from "@/components/common";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserButton() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
        localStorage.removeItem("userId");
      })
      .finally(() => {
        router.push("/");
      });
  };

  const isSelected = (path: string) => (pathname === path ? true : false);

  const authLinks = () => (
    <>
      <div className="my-2">
        <NavLink isSelected={isSelected("/")} href="/">
          Dashboard
        </NavLink>
      </div>
      <div className="my-2">
        <NavLink onClick={handleLogout}>Logout</NavLink>
      </div>
    </>
  );

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={
            !isAuthenticated ? () => router.push("/auth/login") : undefined
          }
        >
          {isAuthenticated ? "My Account" : "Login"}
        </DropdownMenuTrigger>
        {isAuthenticated && (
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            {authLinks()}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}

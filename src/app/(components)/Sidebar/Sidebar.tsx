"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Archive,
  Layout,
  Clipboard,
  LucideIcon,
  Menu,
  User,
  SlidersHorizontal,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface SidebarLinksProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapseed: boolean;
}

const SidebarLinks = ({
  href,
  icon: Icon,
  label,
  isCollapseed,
}: SidebarLinksProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapseed ? "justify-center py-4" : "justify-start py-4 px-4"
        } 
      hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
        isActive ? "bg-blue-200 text-white" : ""
      }
      `}
      >
        <Icon className="w-6 h-6 text-gray-700" />
        <span
          className={`${
            isCollapseed ? "hidden" : "block"
          } font-medium text-gray-700 `}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  useEffect(() => {
    if (!isSidebarCollapsed) {
      dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    }
  }, [pathname]);

  const sidebarClassnames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-gray-100 transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassnames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-2" : "px-8"
        }`}
      >
        <img
          src="/logo.jpg"
          alt="logo"
          className="h-12 object-contain  rounded-full"
        />
        <h1
          className={`font-extrabold text-2xl ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          EDSTOCK
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 eounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-grow mt-8">
        <SidebarLinks
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapseed={isSidebarCollapsed}
        />
        <SidebarLinks
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapseed={isSidebarCollapsed}
        />{" "}
        <SidebarLinks
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapseed={isSidebarCollapsed}
        />{" "}
        <SidebarLinks
          href="/users"
          icon={User}
          label="Users"
          isCollapseed={isSidebarCollapsed}
        />{" "}
        <SidebarLinks
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapseed={isSidebarCollapsed}
        />
        <SidebarLinks
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapseed={isSidebarCollapsed}
        />
      </div>
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10 `}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 Edstock</p>
      </div>
    </div>
  );
};

export default Sidebar;

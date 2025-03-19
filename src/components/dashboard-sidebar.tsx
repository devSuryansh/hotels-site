"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CalendarClock,
  ChevronDown,
  Hotel,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hotels",
    href: "/admin/hotels",
    icon: Hotel,
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: CalendarClock,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <MobileSidebar
            navItems={navItems}
            pathname={pathname}
            openSubmenu={openSubmenu}
            toggleSubmenu={toggleSubmenu}
            setOpen={setOpen}
          />
        </SheetContent>
      </Sheet>

      <div className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Hotel className="h-6 w-6" />
            <span>Hotel Admin</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                pathname={pathname}
                openSubmenu={openSubmenu}
                toggleSubmenu={toggleSubmenu}
              />
            ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto border-t p-4">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/admin/login">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function MobileSidebar({
  navItems,
  pathname,
  openSubmenu,
  toggleSubmenu,
  setOpen,
}: {
  navItems: NavItem[];
  pathname: string;
  openSubmenu: string | null;
  toggleSubmenu: (title: string) => void;
  setOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-semibold"
          onClick={() => setOpen(false)}
        >
          <Hotel className="h-6 w-6" />
          <span>Hotel Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 p-2">
          {navItems.map((item) => (
            <NavItem
              key={item.title}
              item={item}
              pathname={pathname}
              openSubmenu={openSubmenu}
              toggleSubmenu={toggleSubmenu}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/admin/login" onClick={() => setOpen(false)}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  );
}

function NavItem({
  item,
  pathname,
  openSubmenu,
  toggleSubmenu,
  onClick,
}: {
  item: NavItem;
  pathname: string;
  openSubmenu: string | null;
  toggleSubmenu: (title: string) => void;
  onClick?: () => void;
}) {
  const isActive = pathname === item.href;
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const isSubmenuOpen = openSubmenu === item.title;

  if (hasSubmenu) {
    return (
      <div className="space-y-1">
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className="w-full justify-between"
          onClick={() => toggleSubmenu(item.title)}
        >
          <span className="flex items-center">
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isSubmenuOpen && "rotate-180"
            )}
          />
        </Button>
        {isSubmenuOpen && (
          <div className="ml-4 space-y-1 border-l pl-2">
            {item.submenu?.map((subItem) => (
              <Button
                key={subItem.title}
                variant={pathname === subItem.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
                onClick={onClick}
              >
                <Link href={subItem.href}>
                  <subItem.icon className="mr-2 h-4 w-4" />
                  {subItem.title}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start"
      asChild
      onClick={onClick}
    >
      <Link href={item.href}>
        <item.icon className="mr-2 h-4 w-4" />
        {item.title}
      </Link>
    </Button>
  );
}

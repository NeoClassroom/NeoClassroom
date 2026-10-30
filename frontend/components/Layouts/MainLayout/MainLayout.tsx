import type { MainLayoutProps } from "./MainLayout.type";
import { Searchbar } from "../../Atoms/SearchBar";
import { BellIcon, Menu, Profile } from "../../Icon";
import { LeftLayout } from "../LeftLayout";
import { Button } from "../../Atoms/Button";
import { useState } from "react";
import { cn } from "../../../utility";

export const MainLayout = ({
  children,
}: MainLayoutProps) => {
  const user = "harshhemraz403@gmail.com";
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return window.localStorage.getItem("sidebar-collapsed") !== "false";
  });
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((collapsed) => {
      const nextCollapsed = !collapsed;
      window.localStorage.setItem("sidebar-collapsed", String(nextCollapsed));
      return nextCollapsed;
    });
  };

  return (
    <div className="min-h-dvh">
      <LeftLayout
        collapsed={sidebarCollapsed}
        mobileOpen={mobileNavigationOpen}
        onToggleCollapsed={toggleSidebar}
        onCloseMobile={() => setMobileNavigationOpen(false)}
      />

      <div
        className={cn(
          "min-h-dvh transition-[padding] duration-200",
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-72",
        )}
      >
        <header className="sticky top-0 z-30 flex min-h-16 items-center gap-2 border-b border-border bg-background/95 px-3 py-2.5 backdrop-blur sm:px-5 lg:px-6">
          <Button
            variant="ghost"
            className="shrink-0 p-2 lg:hidden"
            aria-label="Open navigation"
            aria-expanded={mobileNavigationOpen}
            onClick={() => setMobileNavigationOpen(true)}
          >
            <Menu size={24} />
          </Button>

          <div className="min-w-0 flex-1">
            <Searchbar
              className="w-full"
              variant="secondary"
              size="sm"
              placeholder="Search..."
            />
          </div>

          <Button
            variant="ghost"
            className="shrink-0 p-2"
            aria-label="Notifications"
          >
            <BellIcon size={24} color="var(--color-muted)" />
          </Button>
          <Profile
            className="hidden shrink-0 sm:block"
            size={32}
            color="var(--color-muted)"
          />
          <p className="hidden max-w-56 truncate text-sm text-text-secondary xl:block">
            {user}
          </p>
        </header>

        <main className="min-w-0 px-3 py-4 sm:px-5 lg:px-6 lg:py-6 2xl:px-8">{children}</main>
      </div>
    </div>
  );
};

import type { LeftLayoutProps } from "./LeftLayout.type";
import { cn } from "../../../utility";
import { LEFTLAYOUT_STYLE } from "./LeftLayout.constants";
import {
  AssignmentIcon,
  CalenderIcon,
  Classroom,
  GradeIcon,
  HomeIcon,
  Menu,
  Profile,
  ResourcesIcon,
  SettingsIcon,
} from "../../Icon";
import { Button } from "../../Atoms/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const navigationItems = [
  { id: "home", label: "Home", icon: <HomeIcon />, path: "/" },
  { id: "classes", label: "Classes", icon: <Classroom />, path: "/classes" },
  {
    id: "calendar",
    label: "Calendar",
    icon: <CalenderIcon />,
    path: "/calender",
  },
  { id: "assignments", label: "Assignments", icon: <AssignmentIcon /> },
  { id: "grades", label: "Grades", icon: <GradeIcon /> },
  { id: "resources", label: "Resources", icon: <ResourcesIcon /> },
] as const;

export const LeftLayout = ({
  title = "NeoClassroom",
  icon = <Profile />,
  children,
  position = "left",
  collapsed = false,
  mobileOpen = false,
  onToggleCollapsed,
  onCloseMobile,
}: LeftLayoutProps) => {
  const profileName = "Harsh Hemraz";
  const profileType = "Student";
  const isCollapsed = collapsed && !mobileOpen;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const routeActivePage =
    pathname === "/classes" ? "classes" : pathname === "/" ? "home" : undefined;
  const [selection, setSelection] = useState<{
    pathname: string;
    pageId: (typeof navigationItems)[number]["id"];
  }>({
    pathname,
    pageId: routeActivePage ?? "home",
  });
  const activePage =
    selection.pathname === pathname
      ? selection.pageId
      : (routeActivePage ?? "home");

  return (
    <div
      data-testid="sidebar-shell"
      data-collapsed={isCollapsed}
      data-mobile-open={mobileOpen}
      className="group/sidebar"
    >
      <Button
        aria-label="Dismiss navigation drawer"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={onCloseMobile}
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <></>
      </Button>
      <aside
        className={cn(
          "fixed inset-y-0 z-50 flex h-dvh w-72 flex-col overflow-y-auto border-border bg-sidebar text-center transition-[width,transform] duration-200 ease-in-out lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "lg:w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          LEFTLAYOUT_STYLE[position],
        )}
      >
        <div
          className={cn(
            "flex min-h-20 items-center gap-3 px-5 py-4",
            isCollapsed && "lg:justify-center lg:px-2",
          )}
        >
          {icon && (!collapsed || mobileOpen) && (
            <span data-testid="sidebar-brand-icon" className="shrink-0">
              {icon}
            </span>
          )}
          <p className="truncate text-xl font-bold group-data-[collapsed=true]/sidebar:lg:hidden">
            {title}
          </p>
          <Button
            variant="ghost"
            className={cn(
              "hidden shrink-0 p-2 lg:flex",
              collapsed ? "mx-auto" : "ml-auto",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            onClick={onToggleCollapsed}
          >
            <Menu size={28} />
          </Button>
          <Button
            variant="ghost"
            className="ml-auto shrink-0 p-2 lg:hidden"
            aria-label="Close navigation"
            onClick={onCloseMobile}
          >
            <Menu size={22} />
          </Button>
        </div>

        <div onClick={onCloseMobile}>
          <nav aria-label="Main navigation" className="space-y-5 px-5">
            {navigationItems.map((item) => {
              const isActive = activePage === item.id;

              return (
                <Button
                  key={item.id}
                  className={cn(
                    "w-full justify-start rounded-3xl transition-all duration-200 [&>svg]:shrink-0 group-data-[collapsed=true]/sidebar:lg:justify-center",
                    isActive
                      ? "bg-linear-to-r from-primary/30 to-accent/20 text-white shadow-lg shadow-primary/20"
                      : "text-text-secondary",
                  )}
                  variant="ghost"
                  size="lg"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setSelection({ pathname, pageId: item.id });
                    if ("path" in item) {
                      navigate(item.path);
                    }
                  }}
                >
                  {item.icon}
                  <span className="group-data-[collapsed=true]/sidebar:lg:hidden">
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </nav>
          {children}
        </div>

        <hr className="mx-auto mt-5 h-px w-[calc(100%-2rem)] border-0 bg-linear-to-r from-transparent via-text-secondary to-transparent group-data-[collapsed=true]/sidebar:lg:hidden" />

        <div
          className={cn(
            "mt-auto p-5 group-data-[collapsed=true]/sidebar:lg:p-2",
          )}
        >
          <hr className="mx-auto my-5 h-px w-full border-0 bg-linear-to-r from-transparent via-text-secondary to-transparent group-data-[collapsed=true]/sidebar:lg:hidden" />
          <div className="flex flex-row justify-center gap-4 group-data-[collapsed=true]/sidebar:lg:flex-col group-data-[collapsed=true]/sidebar:lg:items-center">
            {(!collapsed || mobileOpen) && (
              <span data-testid="sidebar-profile">
                <Profile className="text-text-secondary" size={40} />
              </span>
            )}

            <div className="flex flex-col group-data-[collapsed=true]/sidebar:lg:hidden">
              <p className="text-text-secondary">{profileName}</p>
              <p className="text-text-secondary">{profileType}</p>
            </div>
          </div>
          <div className="my-5 flex justify-center">
            <Button
              variant="ghost"
              className="w-full rounded-2xl p-2 group-data-[collapsed=true]/sidebar:lg:w-auto "
              aria-label="Settings"
            >
              <SettingsIcon className="text-text-secondary/60" />
              <p className="text-text-secondary/60 group-data-[collapsed=true]/sidebar:lg:hidden">
                Setting
              </p>
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
};

import type { MainLayoutProps } from "./MainLayout.type";
import { Searchbar } from "../../Atoms/SearchBar";
import { BellIcon, Profile } from "../../Icon";
import { LeftLayout } from "../LeftLayout";

export const MainLayout = ({
  children,
  leftChildren,
  leftLayoutTitle,
  leftLayoutIcon,
}: MainLayoutProps) => {
  const user = "harshhemraz403@gmail.com";
  return (
    <>
      <header className="ml-auto w-[100vh] p-2 flex flex-row">
        <Searchbar className="hover:scale-102" variant="secondary" size="sm" />

        <BellIcon
          className="ml-20 hover:scale-120"
          size={40}
          color="var(--color-muted)"
        />
        <Profile
          className="mx-2 hover:scale-120"
          size={40}
          color="var(--color-muted)"
        />
        <p className="flex justify-center items-center text-text-secondary">
          {user}
        </p>
      </header>
      <LeftLayout icon={leftLayoutIcon} title={leftLayoutTitle}>
        {leftChildren}
      </LeftLayout>

      {children}
    </>
  );
};

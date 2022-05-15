import { useAppBarActions } from "lib/hooks/useAppBarActions";
import useGetAppBarData from "lib/hooks/useGetAppBarData";
import React from "react";
import { Navbar } from "react-daisyui";
import { MenuIcon } from "ui/icons/MenuIcon";

export interface AppBarProps {
  /**
   * Nav menu is hidden by default via CSS in Mobile, so in mobile this is the reverse
   * In Desktop this is correct.
   */
  navMenuHidden: boolean;
  onShowNavMenu: () => void;
  onHideNavMenu: () => void;
  title?: string;
  appBarEndChildren?: React.ReactNode;
}

export function AppBar({
  navMenuHidden,
  onShowNavMenu,
  onHideNavMenu,
  title,
  appBarEndChildren,
}: AppBarProps) {
  return (
    <Navbar className="shadow-sm bg-neutral text-neutral-content min-h-[48px]">
      <Navbar.Start>
        <button className="btn btn-square btn-sm mr-1">
          <MenuIcon
            className="cursor-pointer"
            onClick={navMenuHidden ? onShowNavMenu : onHideNavMenu}
            aria-label="Menu"
          />
        </button>
        <span className="text-lg font-bold">{title}</span>
      </Navbar.Start>
      <Navbar.End>{appBarEndChildren}</Navbar.End>
    </Navbar>
  );
}

const ConnectedAppBar = ({
  title,
  appBarEndChildren,
}: {
  title?: string;
  appBarEndChildren?: React.ReactNode;
}) => {
  const config = useGetAppBarData();
  const { toggleNavMenu } = useAppBarActions();

  if (!config) {
    return null;
  }

  return (
    <>
      <AppBar
        title={title}
        appBarEndChildren={appBarEndChildren}
        navMenuHidden={config.navMenuHidden}
        onShowNavMenu={toggleNavMenu}
        onHideNavMenu={toggleNavMenu}
      />
    </>
  );
};

export default ConnectedAppBar;

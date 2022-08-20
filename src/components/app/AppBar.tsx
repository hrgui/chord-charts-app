import { useAppBarActions } from "hooks/useAppBarActions";
import useGetAppBarData from "hooks/useGetAppBarData";
import React from "react";
import { Navbar } from "react-daisyui";
import { MenuIcon } from "ui/icons/MenuIcon";
import classNames from "classnames";

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
  // TODO: 240px is hardcoded, width of the appmenu
  return (
    <Navbar
      className={classNames(
        `shadow-sm min-h-[48px] truncate overflow-hidden max-h-[48px] appbar fixed`,
        {
          [`w-[calc(100%_-_240px)]`]: !navMenuHidden,
        }
      )}
    >
      <Navbar.Start>
        <button className="btn btn-square btn-ghost btn-sm mr-1">
          <MenuIcon
            className="cursor-pointer"
            onClick={navMenuHidden ? onShowNavMenu : onHideNavMenu}
            aria-label="Menu"
          />
        </button>
        <span
          className="text-lg font-bold truncate whitespace-nowrap overflow-hidden block break-words"
          title={title}
          data-testid="appBarTitle"
        >
          {title}
        </span>
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

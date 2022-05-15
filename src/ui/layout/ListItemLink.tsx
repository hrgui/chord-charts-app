import { useAppBarActions } from "hooks/useAppBarActions";
import * as React from "react";
import NavLink, { NavLinkProps } from "ui/router/NavLink";
import { isMobile } from "utils";

const ListItemLink = ({
  className,
  onClick,
  dismissMobileMenu = true,
  ...props
}: NavLinkProps & { dismissMobileMenu?: boolean }) => {
  const { toggleNavMenu } = useAppBarActions();
  const handleClick = (e) => {
    onClick?.(e);

    if (dismissMobileMenu && isMobile()) {
      toggleNavMenu();
    }
  };

  return (
    <NavLink
      onClick={handleClick}
      activeClassName="bg-base-300"
      className="flex p-2 items-center hover:bg-base-100"
      {...props}
    ></NavLink>
  );
};

export default ListItemLink;

import * as React from "react";
import NavLink, { NavLinkProps } from "ui/router/NavLink";

const ListItemLink = ({ className, ...props }: NavLinkProps) => {
  return (
    <NavLink
      activeClassName="bg-base-300"
      className="flex p-2 items-center hover:bg-base-100"
      {...props}
    ></NavLink>
  );
};

export default ListItemLink;

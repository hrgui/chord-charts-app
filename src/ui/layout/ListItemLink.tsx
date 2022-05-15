import * as React from "react";
import NavLink from "ui/router/NavLink";

const ListItemLink = ({ className, ...props }: any) => {
  return (
    <NavLink
      activeClassName="bg-base-300"
      className="flex p-2 items-center hover:bg-base-100"
      {...props}
    ></NavLink>
  );
};

export default ListItemLink;

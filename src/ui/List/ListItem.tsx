import React from "react";
import ListItemText, { Props } from "./ListItemText";
import { twMerge } from "tailwind-merge";

export const ListItem = ({
  className,
  button,
  dismissMobileMenu = true,
  ...props
}: Props & { button?: boolean }) => {
  return (
    <ListItemText
      dismissMobileMenu={dismissMobileMenu}
      className={twMerge("flex p-2 items-center hover:bg-base-100 cursor-pointer", className)}
      {...props}
    />
  );
};

export default ListItem;

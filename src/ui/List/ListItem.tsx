import React from "react";
import ListItemText, { Props } from "./ListItemText";
import { twMerge } from "tailwind-merge";

export const ListItem = ({ className, button, ...props }: Props & { button?: boolean }) => {
  return <ListItemText className={twMerge("p-2 cursor:pointer", className)} {...props} />;
};

export default ListItem;

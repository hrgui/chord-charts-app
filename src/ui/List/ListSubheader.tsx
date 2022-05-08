import React from "react";
import ListItemText, { Props } from "./ListItemText";
import { twMerge } from "tailwind-merge";

export const ListSubheader = ({ className, ...props }: Props) => {
  return <ListItemText className={twMerge("p-2", className)} {...props} />;
};

export default ListSubheader;

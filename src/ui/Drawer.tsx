import React from "react";
import { twMerge } from "tailwind-merge";
import classnames from "classnames";

interface DrawerProps extends React.HTMLProps<HTMLDivElement> {
  open?: boolean;
}

const Drawer = ({ className, open, ...props }: DrawerProps) => {
  return (
    <div
      className={twMerge(classnames("bg-base-200", { ["hidden"]: !open }), className)}
      {...props}
    />
  );
};

export default Drawer;

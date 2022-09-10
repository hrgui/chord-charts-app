import React from "react";
import { twMerge } from "tailwind-merge";
import classnames from "classnames";

interface DrawerProps extends React.HTMLProps<HTMLDivElement> {
  open?: boolean;
}

const Drawer = ({ className, open, ...props }: DrawerProps) => {
  return (
    <div
      className={twMerge(
        classnames(
          "cc-drawerContainer fixed z-[1200] sm:static hidden sm:block",
          { ["block sm:hidden"]: !open },
          className
        )
      )}
    >
      <div
        className={twMerge(
          classnames("bg-base-200 cc-drawer", { ["hidden"]: !open })
        )}
        {...props}
      />
    </div>
  );
};

export default Drawer;

import React from "react";
import { twMerge } from "tailwind-merge";

import { isMobile } from "utils";
import { useAppBarActions } from "~/hooks/useAppBarActions";

export interface Props extends React.HTMLProps<HTMLDivElement> {
  primary?: any;
  dismissMobileMenu?: boolean;
}

export const ListItemText = ({
  className,
  primary,
  children,
  onClick,
  dismissMobileMenu = false,
  ...props
}: Props) => {
  const { toggleNavMenu } = useAppBarActions();
  const handleClick = (e) => {
    onClick?.(e);

    if (dismissMobileMenu && isMobile()) {
      toggleNavMenu();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge("flex-[1_1_auto] min-w-0 mt-1 mb-1", className)}
      {...props}
    >
      {children} {primary}
    </div>
  );
};

export default ListItemText;

import React from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

export interface NavLinkProps extends LinkProps {
  activeClassName?: string;
  activeStyle?: React.CSSProperties;
}

export const NavLink = React.forwardRef<NavLinkProps, any>(
  ({ activeClassName, activeStyle, ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [props.className, isActive ? activeClassName : null].filter(Boolean).join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null),
        })}
      />
    );
  }
);

export default NavLink;

import React from "react";
import { twMerge } from "tailwind-merge";
import classnames from "classnames";

interface MaterialSymbolProps extends React.HTMLProps<HTMLSpanElement> {
  icon: string;
}

const MaterialSymbol = ({
  className,
  width,
  height,
  style,
  icon,
  children,
  ...props
}: MaterialSymbolProps) => {
  return (
    <span
      className={twMerge(classnames("material-symbols-outlined"), className)}
      style={{ ...style, width, height }}
      {...props}
    >
      {icon}
    </span>
  );
};

export default MaterialSymbol;

// <span className="material-symbols-outlined">edit</span>

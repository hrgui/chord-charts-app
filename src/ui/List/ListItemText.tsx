import React from "react";
import { twMerge } from "tailwind-merge";

export interface Props extends React.HTMLProps<HTMLDivElement> {
  primary?: any;
}

export const ListItemText = ({ className, primary, children, ...props }: Props) => {
  return (
    <div className={twMerge("flex-[1_1_auto] min-w-0 mt-1 mb-1", className)} {...props}>
      {children} {primary}
    </div>
  );
};

export default ListItemText;

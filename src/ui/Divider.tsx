import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLProps<HTMLHRElement> {}

export const Divider = ({ className, ...props }: Props) => {
  return (
    <hr
      className={twMerge("border-none h-[1px] m-0 flex-shrink-0 divider", className)}
      {...props}
    />
  );
};

export default Divider;

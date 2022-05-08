import React from "react";
import { twMerge } from "tailwind-merge";
import classnames from "classnames";

interface PaperProps extends React.HTMLProps<HTMLDivElement> {}

const Paper = ({ className, open, ...props }: PaperProps) => {
  return <div className={twMerge(classnames("bg-base-200"), className)} {...props} />;
};

export default Paper;

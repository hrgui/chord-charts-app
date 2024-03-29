import classnames from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

type SkeletonProps = React.HTMLProps<HTMLDivElement>;

const Skeleton = ({
  className,
  width,
  height,
  style,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={twMerge(
        classnames("h-6 w-11/12 rounded-md bg-gray-300"),
        className
      )}
      style={{ ...style, width, height }}
      {...props}
    />
  );
};

export default Skeleton;

import * as React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Link = ({ classes, className, ...props }: any) => {
  return <ReactRouterLink className={twMerge("link link-accent", className)} {...props} />;
};

export default Link;

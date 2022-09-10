import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
} from "react-router-dom";
import { twMerge } from "tailwind-merge";

export interface LinkProps extends ReactRouterLinkProps {
  alt?: string;
}

const Link = ({ className, ...props }: LinkProps) => (
  <ReactRouterLink
    className={twMerge("link link-accent", className)}
    {...props}
  />
);

export default Link;

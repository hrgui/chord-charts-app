import React from "react";
import { twMerge } from "tailwind-merge";

export function MenuIcon({ className, ...props }: React.SVGProps<any>) {
  return (
    <svg
      className={twMerge("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
    </svg>
  );
}

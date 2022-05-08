import React from "react";
import { twMerge } from "tailwind-merge";
import classnames from "classnames";

interface DrawerProps extends React.HTMLProps<HTMLDivElement> {
  open?: boolean;
}

/*
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1 0 auto;
    z-index: 1200;
    position: fixed;
    top: 0;
    outline: 0;
    left: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    width: 240px;
    box-sizing: border-box;
*/

const Drawer = ({ className, open, ...props }: DrawerProps) => {
  return (
    <div className={twMerge(classnames("cc-drawerContainer", { ["hidden"]: !open }, className))}>
      <div
        className={twMerge(classnames("bg-base-200 cc-drawer", { ["hidden"]: !open }))}
        {...props}
      />
    </div>
  );
};

export default Drawer;

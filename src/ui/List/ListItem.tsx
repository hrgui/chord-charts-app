import { twMerge } from "tailwind-merge";

import ListItemText, { Props } from "./ListItemText";

export const ListItem = ({
  className,
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  button,
  dismissMobileMenu = true,
  ...props
}: Props & { button?: boolean }) => {
  return (
    <ListItemText
      dismissMobileMenu={dismissMobileMenu}
      className={twMerge(
        "flex p-2 items-center hover:bg-base-100 cursor-pointer",
        className
      )}
      {...props}
    />
  );
};

export default ListItem;

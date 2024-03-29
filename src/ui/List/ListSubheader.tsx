import { twMerge } from "tailwind-merge";

import ListItemText, { Props } from "./ListItemText";

export const ListSubheader = ({ className, ...props }: Props) => {
  return (
    <ListItemText
      className={twMerge(
        "p-2 uppercase tracking-widest font-semibold",
        className
      )}
      {...props}
    />
  );
};

export default ListSubheader;

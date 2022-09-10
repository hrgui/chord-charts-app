import * as React from "react";
import { twMerge } from "tailwind-merge";

import getKeyAsOptions from "./utils/getKeyAsOptions";

interface ChordSelectProps extends React.HTMLProps<HTMLSelectElement> {
  value?: string;
  name?: string;
  onChange?: (e) => any;
  className?: string;
  classes?: any;
}

export const ChordSelect = React.forwardRef<
  HTMLSelectElement,
  ChordSelectProps
>(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      data-testid="chordSelect"
      className={twMerge("select select-bordered", className)}
      {...props}
    >
      {getKeyAsOptions()}
    </select>
  );
});
ChordSelect.displayName = "ChordSelect";

export default ChordSelect;

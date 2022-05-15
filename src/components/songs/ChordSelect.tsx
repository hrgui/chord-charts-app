import * as React from "react";
import getKeyAsOptions from "./utils/getKeyAsOptions";
import { twMerge } from "tailwind-merge";

interface ChordSelectProps {
  value?: string;
  name?: string;
  onChange?: (e) => any;
  className?: string;
  classes?: any;
}

export const ChordSelect = React.forwardRef<HTMLSelectElement, ChordSelectProps>(
  ({ className, ...props }, ref) => {
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
  }
);

export default ChordSelect;

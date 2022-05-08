import * as React from "react";
import getKeyAsOptions from "./utils/getKeyAsOptions";

interface ChordSelectProps {
  value?: string;
  name?: string;
  onChange?: (e) => any;
  className?: string;
  classes?: any;
}

export const ChordSelect = React.forwardRef<HTMLSelectElement, ChordSelectProps>((props, ref) => {
  return (
    <select ref={ref} className="select" {...props}>
      {getKeyAsOptions()}
    </select>
  );
});

export default ChordSelect;

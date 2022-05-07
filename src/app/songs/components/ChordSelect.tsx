import * as React from "react";
import getKeyAsOptions from "./utils/getKeyAsOptions";

interface ChordSelectProps {
  value?: string;
  name?: string;
  onChange?: (e) => any;
  className?: string;
  classes?: any;
}

const ChordSelect: React.FC<ChordSelectProps> = (props) => {
  return <select {...props}>{getKeyAsOptions()}</select>;
};

export default ChordSelect;

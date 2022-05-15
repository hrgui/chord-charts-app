import React from "react";
import Link from "lib/layout/Link";

interface SetlistTitleCellProps {
  value?: string;
  data?: any;
}

const SetlistTitleCell = ({ data, value }: SetlistTitleCellProps) => {
  return <Link to={`/setlist/${data._id}`}>{value}</Link>;
};

export default SetlistTitleCell;

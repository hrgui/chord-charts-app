import * as React from "react";
import Link from "lib/layout/Link";
import { toDomDate } from "lib/utils/date";

interface MobileSetlistTitleCellProps {
  value?: string;
  data?: any;
}

class MobileSetlistTitleCell extends React.Component<any, any> {
  render() {
    const { data } = this.props;
    return (
      <div className="tracking-tight pt-1">
        <Link to={`/setlist/${data._id}`}>{data.title}</Link>
        <div>{data.date && toDomDate(data.date)}</div>
        <div>{data.leader && data.leader}</div>
      </div>
    );
  }
}

export default MobileSetlistTitleCell;

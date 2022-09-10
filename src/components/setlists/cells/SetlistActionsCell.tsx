import SetlistActions from "../SetlistActions";

interface SetlistActionsCellProps {
  data?: any;
}

export function SetlistActionsCell({ data }: SetlistActionsCellProps) {
  return <SetlistActions setlist={data} />;
}

export default SetlistActionsCell;

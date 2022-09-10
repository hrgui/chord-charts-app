import { useParams } from "react-router-dom";

import { SetlistViewContainer } from "~/components/setlists/SetlistViewContainer";

type Props = {};

const SetlistViewPage = (props: Props) => {
  const { id, songIndex } = useParams<{ id: string; songIndex: string }>();
  return <SetlistViewContainer id={id} songIndex={songIndex} {...props} />;
};

export default SetlistViewPage;

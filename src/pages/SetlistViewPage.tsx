import React from "react";
import { SetlistViewContainer } from "~/components/setlists/SetlistViewContainer";
import { useParams } from "react-router-dom";

type Props = {};

const SetlistViewPage = (props: Props) => {
  const { id, songIndex } = useParams<{ id: string; songIndex: string }>();
  return <SetlistViewContainer id={id} songIndex={songIndex} {...props} />;
};

export default SetlistViewPage;

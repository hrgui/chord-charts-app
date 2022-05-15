import React from "react";
import { SongViewContainer } from "components/songs/SongViewContainer";
import { useParams } from "react-router-dom";

export const SongViewPage = () => {
  const { id } = useParams<any>();
  return <SongViewContainer id={id!} />;
};

export default SongViewPage;

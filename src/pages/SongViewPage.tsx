import { useParams } from "react-router-dom";

import { SongViewContainer } from "~/components/songs/SongViewContainer";

export const SongViewPage = () => {
  const { id } = useParams<any>();
  return <SongViewContainer id={id!} />;
};

export default SongViewPage;

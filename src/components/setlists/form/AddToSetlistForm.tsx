import { SetlistListContainer } from "../SetlistsListContainer";
import { useTranslation } from "react-i18next";
import { Alert } from "react-daisyui";
import { useGetSongQuery } from "~/api/services/songs";
import Loading from "~/ui/layout/Loading";

export interface IAddToSetlistFormProps {
  song_id?: string;
  navigate: (str) => any;
}

export default function AddToSetlistForm(props: IAddToSetlistFormProps) {
  const { song_id, navigate } = props;
  const { data, isLoading } = useGetSongQuery(song_id!);
  const { t } = useTranslation();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Alert status="info" className="mb-2">
        <div className="font-semibold">{data?.title}</div>
        <p>{t("song:add_to_setlist/instructions")}</p>
      </Alert>
      <SetlistListContainer
        addToSetlistMode
        song={data}
        onRequestClose={() => navigate("/songs")}
      />
    </>
  );
}

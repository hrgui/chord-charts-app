import * as React from "react";
import SetlistView from "./SetlistView";
import { Loading } from "ui/layout/Loading";
import { useGetSetlistQuery } from "api/services/setlists";
import Page from "ui/layout/Page";
import { useNavigate } from "react-router-dom";

interface SetlistViewPageProps {
  path?: string;
  id?: string;
  songIndex?: string;
  navigate?: any;
  history?: any;
}

export function normalizeSongIndex(songIndex) {
  if (typeof songIndex === "string") {
    // starts off with 1
    return +songIndex - 1;
  }

  return songIndex;
}

export const SetlistViewContainer: React.FC<SetlistViewPageProps> = (props) => {
  let { isLoading, error: isError, data } = useGetSetlistQuery(props.id!);
  const navigate = useNavigate();
  const curTitle =
    data && data.title
      ? `${data.title}${data.leader ? `: ${data.leader}` : ""}`
      : `Setlist ${props.id}`;

  const [isSavingSettings, setIsSavingSettings] = React.useState(false);

  async function handleSaveSetlistSettings(settings) {
    alert("TODO handle save setlist settings changed now");
    // setIsSavingSettings(true);
    // const _data = {
    //   ...data,
    //   settings: { ...data.settings, ...settings },
    // };

    // await saveSetlist({
    //   variables: { id: props._id, data: prepareValues(_data) },
    // });

    // enqueueSnackbar(`Setlist ${data.title || data._id} has been saved.`, {
    //   variant: "success",
    // });
    // setIsSavingSettings(false);
  }

  if (isLoading) {
    return (
      <Page>
        <Loading />
      </Page>
    );
  }

  let { songIndex = 0 } = props;
  songIndex = normalizeSongIndex(songIndex);

  const onIndexChange = (index) => {
    if (index < 0) {
      index = data!.songs.length - 1;
    }

    if (index >= data!.songs.length) {
      index = 0;
    }

    navigate(`/setlist/${props.id}/${index + 1}`, { replace: true });
  };

  return (
    <>
      <SetlistView
        title={curTitle}
        hasUnsavedSettings={isSavingSettings}
        onSaveSetlistSettings={handleSaveSetlistSettings}
        onIndexChange={onIndexChange}
        isLoading={isLoading}
        songIndex={songIndex}
        isError={isError}
        data={data}
      />
    </>
  );
};

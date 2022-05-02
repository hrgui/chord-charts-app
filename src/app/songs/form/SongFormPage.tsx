import * as React from "react";
import { SongForm } from "./SongForm";
import { prepareInputForMutation } from "lib/form/prepareInputForMutation";
import { useUserData } from "lib/hooks/useUserData";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import { useAddSongMutation, useUpdateSongMutation } from "app/services/songs";

export interface SongFormPageProps {
  path?: string;
  id?: string;
  navigate?: any;
  currentGroupId?: string;
}

const SongEditPage: React.FC<SongFormPageProps> = (props) => {
  const { t } = useTranslation();
  const enqueueSnackbar = () => {};
  const [updateSong, { isLoading }] = useUpdateSongMutation();
  // TODO
  const loading = false;
  const error = null;
  let data = {};

  data = data?.song || {};

  return (
    <SongForm
      isLoading={isLoading}
      onSubmit={(values) => updateSong(values)}
      onSubmitSuccess={(res, values) => {
        enqueueSnackbar(t(`song:message/saveSuccess`, { song: values.title || values.id }), {
          variant: "success",
        });
        props.navigate(`/song/${props._id}/view`);
      }}
      onSubmitError={(e) => {
        enqueueSnackbar(t(`song:message/saveError`), { variant: "error" });
        enqueueSnackbar(<pre>{JSON.stringify(e, null, 2)}</pre>, {
          variant: "error",
        });
        console.error(e);
      }}
      error={error}
      data={data}
    />
  );
};

export function getNewSongTemplate(currentGroupId) {
  return {
    title: `Untitled Song ${new Date().toString()}`,
    key: "C",
    artist: "Untitled",
    youtube: "https://www.youtube.com/watch?v=Jbe7OruLk8I",
    tags: ["english"],
    sections: [
      {
        type: "text",
        title: "Untitled Section",
        body: "A B C \n Sample test",
      },
    ],
    share: {
      [currentGroupId]: "editor",
    },
  };
}

const SongNewPage: React.FC<SongFormPageProps> = (props) => {
  const { t } = useTranslation();
  const enqueueSnackbar = () => {};
  const [createSong] = useAddSongMutation();
  const newSongTemplate = getNewSongTemplate(props.currentGroupId);
  return (
    <SongForm
      isNew
      data={newSongTemplate}
      onSubmit={(values) =>
        createSong({
          ...values,
        })
      }
      onSubmitSuccess={(_, values) => {
        enqueueSnackbar(t(`song:message/saveSuccess`, { song: values.title || values.id }), {
          variant: "success",
        });
        props.navigate(`/songs`);
      }}
      onSubmitError={(e) => {
        enqueueSnackbar(t(`song:message/saveError`), { variant: "error" });
        enqueueSnackbar(<pre>{JSON.stringify(e, null, 2)}</pre>, {
          variant: "error",
        });
        console.error(e);
      }}
    />
  );
};

export default (props) => {
  const { id } = useParams<any>();
  const history = useHistory();
  const user = useUserData() || {};
  const SongFormPage = id ? SongEditPage : SongNewPage;

  return (
    <SongFormPage currentGroupId={user.currentGroupId} navigate={history.push} id={id} {...props} />
  );
};

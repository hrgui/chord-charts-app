import * as React from "react";
import { SongForm } from "./SongForm";
import { useUserData } from "lib/hooks/useUserData";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import { useAddSongMutation, useGetSongQuery, useUpdateSongMutation } from "app/services/songs";
import { Song } from "app/services/songs";
import Page from "lib/layout/Page";

export interface SongFormPageProps {
  path?: string;
  id?: string;
  navigate?: any;
  currentGroupId?: string;
}

const SongEditPage: React.FC<SongFormPageProps & { id: string }> = (props) => {
  const { id } = props;
  const { t } = useTranslation();
  const enqueueSnackbar = () => {};
  const [updateSong] = useUpdateSongMutation();
  const { isLoading, data = {} as Song, error } = useGetSongQuery(id);

  return (
    <Page title={`Edit ${data.title}`}>
      <SongForm
        isLoading={isLoading}
        onSubmit={(values) => updateSong(values)}
        onSubmitSuccess={(_, values) => {
          enqueueSnackbar(t(`song:message/saveSuccess`, { song: values.title || values.id }), {
            variant: "success",
          });
          props.navigate(`/song/${id}/view`);
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
    </Page>
  );
};

export function getNewSongTemplate(): Song {
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
  };
}

const SongNewPage: React.FC<SongFormPageProps> = (props) => {
  const { t } = useTranslation();
  const enqueueSnackbar = () => {};
  const [createSong] = useAddSongMutation();
  const newSongTemplate = getNewSongTemplate();

  return (
    <Page title={`New Song`}>
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
    </Page>
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

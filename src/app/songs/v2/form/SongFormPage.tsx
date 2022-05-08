import { Song } from "app/services/songs";
import ChordSelect from "app/songs/components/ChordSelect";
import { YoutubeView } from "app/songs/components/YoutubeView";
import FormActions from "lib/form/FormActions";
import { TWTextField } from "lib/form/TextField";
import Page from "lib/layout/Page";
import React from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "react-daisyui";

type Props = {};

type SongFormProps = {
  onSubmit: SubmitHandler<Song>;
  onError: SubmitErrorHandler<Song>;
  isLoading?: boolean;
  data: Song;
};

export function getNewSongTemplate(): Song {
  return {
    title: `Untitled Song ${new Date().toString()}`,
    key: "C",
    artist: "Untitled",
    youtube: "https://www.youtube.com/watch?v=E7_adG0nV0E",
    sections: [
      {
        type: "text",
        title: "Untitled Section",
        body: "A B C \n Sample test",
      },
    ],
  };
}

export function SongForm({ onSubmit, onError, data }: SongFormProps) {
  const { register, handleSubmit, watch } = useForm<Song>({ defaultValues: data });
  const currentYoutubeValue = watch("youtube", data.youtube);
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <YoutubeView className="youtube-view-input" value={currentYoutubeValue} />
      <div className="p-4">
        <TWTextField label={t("song:label/title")} {...register("title")} />
        <TWTextField label={t("song:label/artist")} {...register("artist")} />

        <div className="form-control">
          <label className="label">
            <span className="label-text">{t("song:label/key")}</span>
          </label>
          <ChordSelect {...register("key")} />
        </div>
        <TWTextField label={t("song:label/youtube")} {...register("youtube")} />
      </div>

      <FormActions>
        <Button type="submit">{t("save")}</Button>
      </FormActions>
    </form>
  );
}

export const SongFormPage = (props: Props) => {
  return (
    <Page title="New Song">
      <SongForm data={getNewSongTemplate()} onSubmit={() => {}} onError={() => {}} />
    </Page>
  );
};

export default SongFormPage;

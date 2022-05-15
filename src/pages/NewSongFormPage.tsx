import React from "react";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getNewSongTemplate, Song, useAddSongMutation } from "api/services/songs";
import { SongForm } from "components/songs/form/SongForm";
import Page from "ui/layout/Page";
import ErrorAlert from "ui/alert/ErrorAlert";

export function NewSongFormPage() {
  const newSongTemplate = getNewSongTemplate();
  const [createSong] = useAddSongMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit: SubmitHandler<Song> = async (values) => {
    const promise = createSong(values);

    await toast.promise(promise, {
      loading: t("song:action/create/submitting", { title: values.title }),
      success: t("song:action/create/submitted", { title: values.title }),
      error: (err) => <ErrorAlert message={t("song:action/create/error")} error={err} />,
    });

    navigate("/songs");
  };
  return (
    <Page title="New Song">
      <SongForm data={newSongTemplate} onSubmit={handleSubmit} />
    </Page>
  );
}

export default NewSongFormPage;

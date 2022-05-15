import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useGetSongQuery, Song, useUpdateSongMutation } from "api/services/songs";
import { SongForm } from "components/songs/form/SongForm";
import Page from "ui/layout/Page";
import PageLoading from "ui/layout/PageLoading";
import ErrorAlert from "ui/alert/ErrorAlert";

export function EditSongFormPage() {
  const [updateSong] = useUpdateSongMutation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isLoading, data = {} as Song, error } = useGetSongQuery(id!);
  const { t } = useTranslation();

  const handleSubmit: SubmitHandler<Song> = async (values) => {
    const promise = updateSong(values);

    await toast.promise(promise, {
      loading: t("song:action/edit/submitting", { title: values.title }),
      success: t("song:action/edit/submitted", { title: values.title }),
      error: (err) => <ErrorAlert message={t("song:action/edit/error")} error={err} />,
    });

    navigate(`/song/${values._id}/view`);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <ErrorAlert message={t("song:load/error")} error={error as Error} />;
  }

  return (
    <Page title={`Edit ${data.title}`}>
      <SongForm data={data} onSubmit={handleSubmit} />
    </Page>
  );
}

export default EditSongFormPage;

import { useGetSongQuery, Song, useUpdateSongMutation } from "app/services/songs";
import { SongForm } from "components/songs/form/SongForm";
import Page from "lib/layout/Page";
import PageLoading from "lib/layout/PageLoading";
import React from "react";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export function EditSongFormPage() {
  const [updateSong] = useUpdateSongMutation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isLoading, data = {} as Song, error } = useGetSongQuery(id!);

  const handleSubmit: SubmitHandler<Song> = async (values) => {
    await updateSong(values);
    navigate(`/song/${id}/view`);
  };

  const handleError: SubmitErrorHandler<Song> = (values, error) => {
    alert("TODO: Unable to submit form");
    console.error(values);
    console.error(error);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  return (
    <Page title={`Edit ${data.title}`}>
      <SongForm data={data} onSubmit={handleSubmit} onError={handleError} />
    </Page>
  );
}

export default EditSongFormPage;

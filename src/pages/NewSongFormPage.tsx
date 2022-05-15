import { getNewSongTemplate, Song, useAddSongMutation } from "app/services/songs";
import { SongForm } from "components/songs/form/SongForm";
import Page from "lib/layout/Page";
import React from "react";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function NewSongFormPage() {
  const newSongTemplate = getNewSongTemplate();
  const [createSong] = useAddSongMutation();
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<Song> = async (values) => {
    await createSong(values);
    navigate("/songs");
  };

  const handleError: SubmitErrorHandler<Song> = (values, error) => {
    alert("TODO: Unable to submit form");
    console.error(values);
    console.error(error);
  };

  return (
    <Page title="New Song">
      <SongForm data={newSongTemplate} onSubmit={handleSubmit} onError={handleError} />
    </Page>
  );
}

export default NewSongFormPage;

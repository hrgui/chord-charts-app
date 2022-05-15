import React from "react";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { getNewSetlistTemplate, Setlist, useAddSetlistMutation } from "api/services/setlists";

import { useNavigate } from "react-router-dom";
import Page from "lib/layout/Page";
import { SetlistForm } from "components/setlists/form/SetlistForm";

export function NewSetlistFormPage() {
  const navigate = useNavigate();
  const [createSetlist] = useAddSetlistMutation();
  const data = getNewSetlistTemplate();
  const handleSubmit: SubmitHandler<Setlist> = async (values) => {
    await createSetlist(values);
    navigate(`/setlists`);
  };

  const handleError: SubmitErrorHandler<Setlist> = (values, error) => {
    alert("TODO: Unable to submit form");
    console.error(values);
    console.error(error);
  };

  return (
    <Page title={`New Setlist`}>
      <SetlistForm data={data} onSubmit={handleSubmit} onError={handleError} />
    </Page>
  );
}

export default NewSetlistFormPage;

import React from "react";
import { Setlist, useGetSetlistQuery, useUpdateSetlistMutation } from "api/services/setlists";
import { SetlistForm } from "components/setlists/form/SetlistForm";
import Page from "ui/layout/Page";
import PageLoading from "ui/layout/PageLoading";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export function EditSetlistFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateSetlist] = useUpdateSetlistMutation();
  const { isLoading, data = {} as Setlist, error } = useGetSetlistQuery(id as string);

  const handleSubmit: SubmitHandler<Setlist> = async (values) => {
    await updateSetlist(values);
    navigate(`/setlist/${id}`);
  };

  const handleError: SubmitErrorHandler<Setlist> = (values, error) => {
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
      <SetlistForm data={data} onSubmit={handleSubmit} onError={handleError} />
    </Page>
  );
}

export default EditSetlistFormPage;

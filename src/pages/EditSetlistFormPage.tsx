import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Setlist, useGetSetlistQuery, useUpdateSetlistMutation } from "api/services/setlists";
import { SetlistForm } from "components/setlists/form/SetlistForm";
import Page from "ui/layout/Page";
import PageLoading from "ui/layout/PageLoading";
import ErrorAlert from "ui/alert/ErrorAlert";

export function EditSetlistFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateSetlist] = useUpdateSetlistMutation();
  const { isLoading, data = {} as Setlist, error } = useGetSetlistQuery(id as string);
  const { t } = useTranslation();

  const handleSubmit: SubmitHandler<Setlist> = async (values) => {
    const promise = updateSetlist(values);

    await toast.promise(promise, {
      loading: t("setlist:action/edit/submitting", { title: values.title }),
      success: t("setlist:action/edit/submitted", { title: values.title }),
      error: (err) => <ErrorAlert message={t("setlist:action/edit/error")} error={err} />,
    });

    navigate(`/setlist/${id}`);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <ErrorAlert message={t("setlist:action/load/error")} error={error as Error} />;
  }

  return (
    <Page title={`Edit ${data.title}`}>
      <SetlistForm data={data} onSubmit={handleSubmit} />
    </Page>
  );
}

export default EditSetlistFormPage;

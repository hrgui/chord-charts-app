import React from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getNewSetlistTemplate, Setlist, useAddSetlistMutation } from "~/api/services/setlists";
import Page from "~/ui/layout/Page";
import { SetlistForm } from "~/components/setlists/form/SetlistForm";
import ErrorAlert from "~/ui/alert/ErrorAlert";

export function NewSetlistFormPage() {
  const navigate = useNavigate();
  const [createSetlist] = useAddSetlistMutation();
  const data = getNewSetlistTemplate();
  const { t } = useTranslation();

  const handleSubmit: SubmitHandler<Setlist> = async (values) => {
    const promise = createSetlist(values);

    await toast.promise(promise, {
      loading: t("setlist:action/create/submitting", { title: values.title }),
      success: t("setlist:action/create/submitted", { title: values.title }),
      error: (err) => <ErrorAlert message={t("setlist:action/create/error")} error={err} />,
    });

    navigate(`/setlists`);
  };

  return (
    <Page title={`New Setlist`}>
      <SetlistForm data={data} onSubmit={handleSubmit} />
    </Page>
  );
}

export default NewSetlistFormPage;

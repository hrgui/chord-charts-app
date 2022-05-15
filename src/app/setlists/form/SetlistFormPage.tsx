import React from "react";
import { getUpcomingSunday, toDomDate } from "lib/utils/date";
import { useForm, SubmitHandler, SubmitErrorHandler, useFieldArray } from "react-hook-form";
import {
  Setlist,
  useAddSetlistMutation,
  useGetSetlistQuery,
  useUpdateSetlistMutation,
} from "app/services/setlists";
import FormSection from "ui/form/FormSection";
import { useTranslation } from "react-i18next";
import FormControl from "ui/form/FormControl";
import { Button, Input, Modal } from "react-daisyui";
import { SongListContainer } from "components/songs/SongsListContainer";
import SetlistSongFieldRow from "./SetlistSongFieldRow";
import { useNavigate, useParams } from "react-router-dom";
import PageLoading from "lib/layout/PageLoading";
import Page from "lib/layout/Page";

function getNewSetlistTemplate(): Setlist {
  const sunday = toDomDate(getUpcomingSunday());
  return {
    title: `Sunday Setlist - ${sunday}`,
    date: sunday,
    songs: [],
  };
}

type SetlistFormProps = {
  onSubmit: SubmitHandler<Setlist>;
  onError: SubmitErrorHandler<Setlist>;
  isLoading?: boolean;
  data: Setlist;
};

export function SetlistForm({ onSubmit, onError, data }: SetlistFormProps) {
  const { register, handleSubmit, control } = useForm<Setlist>({ defaultValues: data });
  const { t } = useTranslation();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "songs",
  });
  const [open, setDialogOpen] = React.useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormSection>
        <FormControl label={t("setlist:form/label/date")}>
          <Input {...register("date")} type="date" />
        </FormControl>
        <FormControl label={t("setlist:form/label/title")}>
          <Input {...register("title")} />
        </FormControl>
        <FormControl label={t("setlist:form/label/leader")}>
          <Input {...register("leader")} />
        </FormControl>
      </FormSection>

      <FormSection>
        <h3 className="font-semibold m-1">{t("setlist:form/label/songs")}</h3>

        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th className="w-3/5">Title</th>
              <th className="w-1/7">Artist</th>
              <th className="w-1/7">Key</th>
              <th className="w-1/7">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <SetlistSongFieldRow
                isMoveUpDisabled={index === 0}
                isMoveDownDisabled={index === fields.length - 1}
                key={field.id}
                setlistSong={field}
                index={index}
                onRemove={() => remove(index)}
                onSwap={(from, to) => move(from, to)}
                register={register}
              />
            ))}
          </tbody>
        </table>
      </FormSection>

      <FormSection>
        <Button type="button" onClick={() => setDialogOpen(true)}>
          {t("setlist:action/addSong")}
        </Button>
      </FormSection>

      <FormSection>
        <Button type="submit">{t("save")}</Button>
      </FormSection>

      <Modal open={open} className="w-full max-w-full sm:w-11/12 sm:max-w-5xl">
        <SongListContainer
          addToSetlistMode
          onAddSong={({ _id, key }) => {
            append({ _id, settings: { overrideKey: key } });
            setDialogOpen(false);
          }}
        />
      </Modal>
    </form>
  );
}

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

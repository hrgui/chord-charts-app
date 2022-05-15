import React from "react";
import { getUpcomingSunday, toDomDate } from "lib/utils/date";
import { useForm, SubmitHandler, SubmitErrorHandler, useFieldArray } from "react-hook-form";
import {
  getNewSetlistTemplate,
  Setlist,
  useAddSetlistMutation,
  useGetSetlistQuery,
  useUpdateSetlistMutation,
} from "api/services/setlists";
import FormSection from "ui/form/FormSection";
import { useTranslation } from "react-i18next";
import FormControl from "ui/form/FormControl";
import { Button, Input, Modal } from "react-daisyui";
import { SongListContainer } from "components/songs/SongsListContainer";
import SetlistSongFieldRow from "./SetlistSongFieldRow";
import { useNavigate, useParams } from "react-router-dom";
import PageLoading from "lib/layout/PageLoading";
import Page from "lib/layout/Page";

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

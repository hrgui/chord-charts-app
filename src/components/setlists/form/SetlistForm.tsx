import React from "react";
import { Button, Input, Modal } from "react-daisyui";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Setlist } from "~/api/services/setlists";
import { SongListContainer } from "~/components/songs/SongsListContainer";
import FormControl from "~/ui/form/FormControl";
import FormSection from "~/ui/form/FormSection";

import SetlistSongFieldRow from "./SetlistSongFieldRow";

type SetlistFormProps = {
  onSubmit: SubmitHandler<Setlist>;
  isLoading?: boolean;
  data: Setlist;
};

export function SetlistForm({ onSubmit, data }: SetlistFormProps) {
  const { register, handleSubmit, control } = useForm<Setlist>({
    defaultValues: data,
  });
  const { t } = useTranslation();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "songs",
  });
  const [open, setDialogOpen] = React.useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection>
        <FormControl label={t("setlist:form/label/date")} htmlFor="date">
          <Input {...register("date")} type="date" id="date" />
        </FormControl>
        <FormControl label={t("setlist:form/label/title")} htmlFor="title">
          <Input {...register("title")} id="title" />
        </FormControl>
        <FormControl label={t("setlist:form/label/leader")} htmlFor="leader">
          <Input {...register("leader")} id="leader" />
        </FormControl>
      </FormSection>

      <FormSection>
        <h3 className="font-semibold m-1">{t("setlist:form/label/songs")}</h3>

        <table className="table table-fixed table-zebra w-full">
          <thead>
            <tr>
              <th className="hidden sm:table-cell"></th>
              <th className="w-[calc(100%_-_(80px_+_4rem))] sm:w:3/5">Title</th>
              <th className="hidden sm:table-cell sm:w-1/7">Artist</th>
              <th className="w-[80px]">Key</th>
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
            append({ _id: _id as string, settings: { overrideKey: key } });
            setDialogOpen(false);
          }}
        />
      </Modal>
    </form>
  );
}

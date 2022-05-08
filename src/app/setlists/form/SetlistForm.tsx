import React from "react";
import { Modal, Button } from "react-daisyui";
import { TextField } from "lib/form/TextField";
import FormActions from "lib/form/FormActions";
import { Form } from "lib/form/Form";
import { FieldArray } from "formik";
import SetlistSongFieldRow, { NoSongsRow } from "./SetlistSongFieldRow";
import { useTranslation } from "react-i18next";
import { SongListContainer } from "app/songs/SongsListPage";
import Paper from "ui/Paper";

export interface ISetlistFormProps {
  isNew?;
  isLoading?;
  isModalMode?: boolean;
  data?;
  onSubmit?;
  onSubmitSuccess?;
  onSubmitError?;
  isError?;
}

export const SetlistForm = (props: ISetlistFormProps) => {
  const { data, isLoading, isModalMode, isNew } = props;
  const SetlistFormActions = isModalMode ? Modal.Actions : FormActions;
  const { t } = useTranslation();
  const [open, setDialogOpen] = React.useState(false);

  if (isLoading) {
    return null;
  }

  return (
    <Form
      initialValues={data}
      onSubmit={props.onSubmit}
      onSubmitSuccess={props.onSubmitSuccess}
      onSubmitError={props.onSubmitError}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <div className="p-2">
          <div className="p-2 mb-2 bg-base-200">
            <TextField fullWidth label={t("setlist:form/label/date")} name="date" type="date" />
            <TextField fullWidth label={t("setlist:form/label/title")} name="title" />
            <TextField fullWidth label={t("setlist:form/label/leader")} name="leader" />
            <TextField multiline fullWidth label={t("setlist:form/label/notes")} name="notes" />
          </div>
          <div className="p-2 mb-2">
            <h3 className="font-semibold m-1">{t("setlist:form/label/songs")}</h3>
            <table className="table">
              <tbody>
                <FieldArray name="songs">
                  {({ swap, remove, form }) => {
                    if (form.values.songs.length === 0) {
                      return <NoSongsRow isNew={isNew} />;
                    }

                    return form.values.songs.map((songId, index) => {
                      return (
                        <SetlistSongFieldRow
                          onSongKeyChange={(e) => {
                            form.setFieldValue("settings", {
                              ...form.values.settings,
                              [songId]: {
                                ...form.values?.settings?.[songId],
                                overrideKey: e.target.value,
                              },
                            });
                          }}
                          settings={form.values?.settings?.[songId]}
                          key={index}
                          index={index}
                          songId={songId}
                          onSwap={swap}
                          onRemove={remove}
                        />
                      );
                    });
                  }}
                </FieldArray>
              </tbody>
            </table>
            <Button onClick={(e) => setDialogOpen(true)}>Add Song</Button>
          </div>

          <Modal open={open}>
            <SongListContainer
              addToSetlistMode
              onAddSong={({ _id: id }) => {
                setFieldValue("songs", [...values.songs, id]);
                setDialogOpen(false);
              }}
            />
          </Modal>
          <SetlistFormActions>
            <Button
              onClick={(e) => {
                //@ts-ignore
                return handleSubmit(e);
              }}
            >
              Save
            </Button>
          </SetlistFormActions>
        </div>
      )}
    </Form>
  );
};

export default SetlistForm;

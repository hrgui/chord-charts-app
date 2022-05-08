import React from "react";
import { Form } from "lib/form/Form";
import { ChipInputField } from "lib/form/ChipInputField";
import { TextField } from "lib/form/TextField";
import { ChordSelectField } from "./ChordSelectField";
import { SongSectionsField } from "./SongSectionsField";
import ConnectedYoutubeView from "../components/YoutubeView";
import classnames from "classnames";
import FormActions from "lib/form/FormActions";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "formik";
import * as Yup from "yup";
import { Song } from "app/services/songs";
import Paper from "ui/Paper";
import { Button } from "react-daisyui";

export interface SongFormProps {
  isNew?: boolean;
  isLoading?: boolean;
  error?: any;
  data: Song;
  onSubmit: (values) => any;
  onSubmitSuccess?: (res, values) => any;
  onSubmitError?: (e) => any;
}

export const SongForm = (props: SongFormProps) => {
  const { data, error, isLoading } = props;
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    artist: Yup.string().required(),
    key: Yup.string().required(),
  });

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  //TODO fix me
  const width = "xl";
  const isMobile = false;

  return (
    <Form
      validationSchema={validationSchema}
      initialValues={data}
      onSubmit={props.onSubmit}
      onSubmitSuccess={props.onSubmitSuccess}
      onSubmitError={props.onSubmitError}
    >
      {({ values, errors, submitForm, isSubmitting }) => (
        <>
          <form>
            <div className="p-4">
              <div
                className={classnames(
                  "flex w-full flex-col-reverse sm:flex-col pl-2 pr-2 pt-2 pb-0",
                  {
                    "SongFormCard-mobile": !isMobile,
                  }
                )}
              >
                <TextField
                  className={"mb-1"}
                  fullWidth
                  error={errors.title}
                  helperText={<ErrorMessage name="title" />}
                  label={t("song:label/title")}
                  name="title"
                />
                <TextField
                  error={errors.artist}
                  helperText={<ErrorMessage name="artist" />}
                  label={t("song:label/artist")}
                  name="artist"
                />
                <div className="ml-auto pr-1">
                  <ChordSelectField
                    error={errors.key}
                    helperText={<ErrorMessage name="key" />}
                    label={t("song:label/key")}
                    name="key"
                  />
                </div>
                <ConnectedYoutubeView
                  className={classnames({
                    "ConnectedYoutubeView-tablet": width === "md",
                    "ConnectedYoutubeView-mobile": width === "sm" || width === "xs",
                    "ConnectedYoutubeView-breakout": !(width === "lg" || width === "xl"),
                  })}
                  value={values.youtube}
                />
              </div>
              <Paper className={"p-2 mb-2"}>
                <TextField
                  className="mb-1"
                  fullWidth
                  label={t("song:label/youtube")}
                  name="youtube"
                />
                <ChipInputField fullWidth label={t("song:label/tags")} name="tags" />
              </Paper>
              <SongSectionsField name="sections" />
              <FormActions>
                <Button type="submit" onClick={submitForm} disabled={isSubmitting}>
                  {t("save")}
                </Button>
              </FormActions>
            </div>
          </form>
        </>
      )}
    </Form>
  );
};

export default SongForm;

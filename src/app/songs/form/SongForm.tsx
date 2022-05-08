import React from "react";
import { Form } from "lib/form/Form";
import { ChipInputField } from "lib/form/ChipInputField";
import { TextField } from "lib/form/TextField";
import { ChordSelectField } from "./ChordSelectField";
import { SongSectionsField } from "./SongSectionsField";
import ConnectedYoutubeView from "../components/YoutubeView";
import classnames from "classnames";
import FormActions from "lib/form/FormActions";
import styled from "styled-components";
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

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const SongFormCard = styled(Paper)`
  display: flex;
  width: 100%;

  &.SongFormCard-mobile {
    flex-direction: column-reverse;
  }
`;

const TitleAndArtistFieldSet = styled.div`
  width: 100%;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
`;

const ArtistTextField = styled(TextField)`
  min-width: 200px;
`;

const ChordSelectFieldSet = styled.div`
  margin-left: auto;
  padding-right: ${({ theme }) => theme.spacing(1)}px;
`;

const StyledConnectedYoutubeView = styled(ConnectedYoutubeView)`
  margin-left: auto;

  &.ConnectedYoutubeView-tablet,
  &.ConnectedYoutubeView-mobile {
    margin-left: 0;
    & iframe {
      width: 100% !important;
    }
  }

  &.ConnectedYoutubeView-breakout {
    width: calc(100% + 36px);
    margin-left: ${({ theme }) => -theme.spacing() * 2}px;
    margin-top: ${({ theme }) => -theme.spacing() * 2}px;
  }
`;

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
            <Container>
              <SongFormCard
                className={classnames("pl-2 pr-2 pt-2 pb-0", {
                  "SongFormCard-mobile": !isMobile,
                })}
              >
                <TitleAndArtistFieldSet>
                  <TextField
                    className={"mb-1"}
                    fullWidth
                    error={errors.title}
                    helperText={<ErrorMessage name="title" />}
                    label={t("song:label/title")}
                    name="title"
                  />
                  <ArtistTextField
                    error={errors.artist}
                    helperText={<ErrorMessage name="artist" />}
                    label={t("song:label/artist")}
                    name="artist"
                  />
                </TitleAndArtistFieldSet>
                <ChordSelectFieldSet>
                  <ChordSelectField
                    error={errors.key}
                    helperText={<ErrorMessage name="key" />}
                    label={t("song:label/key")}
                    name="key"
                  />
                </ChordSelectFieldSet>
                <StyledConnectedYoutubeView
                  className={classnames({
                    "ConnectedYoutubeView-tablet": width === "md",
                    "ConnectedYoutubeView-mobile": width === "sm" || width === "xs",
                    "ConnectedYoutubeView-breakout": !(width === "lg" || width === "xl"),
                  })}
                  value={values.youtube}
                />
              </SongFormCard>
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
            </Container>
          </form>
        </>
      )}
    </Form>
  );
};

export default SongForm;

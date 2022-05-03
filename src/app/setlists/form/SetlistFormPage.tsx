import * as React from "react";
import SetlistForm from "./SetlistForm";
import { getUpcomingSunday, toDomDate } from "lib/utils/date";
import { useUserData } from "lib/hooks/useUserData";
import { useModalRouteMode } from "lib/hooks/useModalRouteMode";
import { useTranslation } from "react-i18next";
import {
  useAddSetlistMutation,
  useGetSetlistQuery,
  useUpdateSetlistMutation,
} from "app/services/setlists";

export interface SetlistFormPageProps {
  path?: string;
  id?: string;
  navigate?: any;
  currentGroupId?: string;
  isModalMode?: boolean;
}

function prepareValues({ id, __typename, ...other }) {
  return other;
}

const SetlistEditPage: React.FC<SetlistFormPageProps> = (props) => {
  const { id } = props;
  const enqueueSnackbar = () => {};
  const [updateSetlist] = useUpdateSetlistMutation();
  const { t } = useTranslation();
  const { isLoading, data = {}, error } = useGetSetlistQuery(id);

  return (
    <SetlistForm
      isModalMode={props.isModalMode}
      isLoading={isLoading}
      onSubmit={(values) => updateSetlist(values)}
      onSubmitSuccess={(_, values) => {
        enqueueSnackbar(
          t("setlist:message/saveSuccess", {
            setlist: values.title || values.id,
          }),
          {
            variant: "success",
          }
        );
        props.navigate(`/setlist/${id}`);
      }}
      onSubmitError={(e) => {
        enqueueSnackbar(t("setlist:message/saveError"), { variant: "error" });
        enqueueSnackbar(<pre>{JSON.stringify(e, null, 2)}</pre>, {
          variant: "error",
        });
        console.error(e);
      }}
      isError={isError}
      data={data}
    />
  );
};

function getNewSetlistTemplate() {
  const sunday = toDomDate(getUpcomingSunday());
  return {
    title: `Sunday Setlist - ${sunday}`,
    date: sunday,
    songs: [],
    settings: {},
  };
}

const SetlistNewPage: React.FC<SetlistFormPageProps> = (props) => {
  const enqueueSnackbar = () => {};
  const [createSetlist] = useAddSetlistMutation();

  const setlistTemplate = getNewSetlistTemplate();
  const { t } = useTranslation();

  return (
    <SetlistForm
      isModalMode={props.isModalMode}
      isNew
      data={setlistTemplate}
      onSubmit={(values) => createSetlist(values)}
      onSubmitSuccess={(_, values) => {
        enqueueSnackbar(
          t("setlist:message/saveSuccess", {
            setlist: values.title || values.id,
          }),
          {
            variant: "success",
          }
        );
        props.navigate(`/setlists`);
      }}
      onSubmitError={(e) => {
        enqueueSnackbar(t("setlist:message/saveError"), { variant: "error" });
        enqueueSnackbar(<pre>{JSON.stringify(e, null, 2)}</pre>, {
          variant: "error",
        });
        console.error(e);
      }}
    />
  );
};

export default (props) => {
  const user = useUserData() || {};
  const { id } = props.match.params;
  const SetlistFormPage = id ? SetlistEditPage : SetlistNewPage;
  const [isModalMode, navigate] = useModalRouteMode();

  return (
    <SetlistFormPage
      isModalMode={isModalMode}
      currentGroupId={user.currentGroupId}
      id={id}
      navigate={navigate}
      {...props}
    />
  );
};

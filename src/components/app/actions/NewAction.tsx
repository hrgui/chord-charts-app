import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "ui/List";
import { useTranslation } from "react-i18next";
import MaterialSymbol from "ui/icons/MaterialSymbol";
import { hasUserInputtedData, destroySession } from "api/db";

const NewAction = () => {
  const { t } = useTranslation();
  const handleNewSession = async () => {
    const shouldPrompt = await hasUserInputtedData();
    if (shouldPrompt) {
      const agreement = confirm(t("actions/clearlocaldb/confirm"));
      if (!agreement) {
        return;
      }
    }

    await destroySession();
    //TODO maybe find a way to destroy redux
    window.location.href = "/";
  };

  return (
    <ListItem dismissMobileMenu={false} onClick={handleNewSession}>
      <ListItemIcon>
        <MaterialSymbol icon={"add_box"} />
      </ListItemIcon>
      <ListItemText>{t("actions/new_session")}</ListItemText>
    </ListItem>
  );
};

export default NewAction;

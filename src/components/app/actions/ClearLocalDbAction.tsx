import React from "react";
import { ListItem, ListItemText } from "ui/List";
import db from "api/db";
import { useTranslation } from "react-i18next";

const ClearLocalDbAction = () => {
  const { t } = useTranslation();
  return (
    <ListItem
      onClick={() => {
        const agreement = confirm(t("actions/clearlocaldb/confirm"));
        if (!agreement) {
          return;
        }

        db.destroy();
        window.location.href = "/";
      }}
    >
      <ListItemText>{t("actions/clearlocaldb")}</ListItemText>
    </ListItem>
  );
};

export default ClearLocalDbAction;

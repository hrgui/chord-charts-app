import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "ui/List";
import db from "api/db";
import { useTranslation } from "react-i18next";
import MaterialSymbol from "ui/icons/MaterialSymbol";

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
      <ListItemIcon>
        <MaterialSymbol icon={"delete_forever"} />
      </ListItemIcon>
      <ListItemText>{t("actions/clearlocaldb")}</ListItemText>
    </ListItem>
  );
};

export default ClearLocalDbAction;

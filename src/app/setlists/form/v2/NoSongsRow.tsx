import React from "react";
import { useTranslation } from "react-i18next";

export function NoSongsRow({ isNew }: { isNew? }) {
  const { t } = useTranslation();
  return (
    <tr>
      <td className={"text-center"}>
        {isNew ? t("setlist:form/no_songs_new") : t("setlist:form/no_songs")}
      </td>
    </tr>
  );
}

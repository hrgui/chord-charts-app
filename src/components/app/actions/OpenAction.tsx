import { ListItem, ListItemIcon, ListItemText } from "~/ui/List";
import { useTranslation } from "react-i18next";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";
import { destroySession, hasUserInputtedData } from "~/api/db";
import { importDbFromFile } from "~/api/file/import-export-file";

const OpenAction = () => {
  const { t } = useTranslation();

  const handleOpenFile = async () => {
    const shouldPrompt = await hasUserInputtedData();
    if (shouldPrompt) {
      const agreement = confirm(t("actions/clearlocaldb/confirm"));
      if (!agreement) {
        return;
      }
    }

    await destroySession();
    await importDbFromFile();
    //TODO maybe find a way to destroy redux
    window.location.href = "/";
  };

  return (
    <ListItem dismissMobileMenu={false} onClick={handleOpenFile}>
      <ListItemIcon>
        <MaterialSymbol icon={"file_open"} />
      </ListItemIcon>
      <ListItemText>{t("actions/file_open")}</ListItemText>
    </ListItem>
  );
};

export default OpenAction;

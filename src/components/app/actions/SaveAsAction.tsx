import { ListItem, ListItemIcon, ListItemText } from "~/ui/List";
import { useTranslation } from "react-i18next";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";
import { saveDbToFile } from "~/api/file/import-export-file";

const SaveAsAction = () => {
  const { t } = useTranslation();

  const handleSaveFile = async () => {
    await saveDbToFile(true);
  };

  return (
    <ListItem dismissMobileMenu={false} onClick={handleSaveFile}>
      <ListItemIcon>
        <MaterialSymbol icon={"save_as"} />
      </ListItemIcon>
      <ListItemText>{t("actions/save_as")}</ListItemText>
    </ListItem>
  );
};

export default SaveAsAction;

import { useTranslation } from "react-i18next";

import { saveDbToFile } from "~/api/file/import-export-file";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";
import { ListItem, ListItemIcon, ListItemText } from "~/ui/List";

const SaveAction = () => {
  const { t } = useTranslation();

  const handleSaveFile = async () => {
    await saveDbToFile();
  };

  return (
    <ListItem dismissMobileMenu={false} onClick={handleSaveFile}>
      <ListItemIcon>
        <MaterialSymbol icon={"save"} />
      </ListItemIcon>
      <ListItemText>{t("actions/save")}</ListItemText>
    </ListItem>
  );
};

export default SaveAction;

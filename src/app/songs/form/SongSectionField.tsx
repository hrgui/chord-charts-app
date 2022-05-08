import * as React from "react";
import { TextField } from "lib/form/TextField";
import ChordChartTextField from "./ChordChartTextField";
import AbcTextField from "./AbcTextField";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Delete from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";

interface SongSectionFieldPanelProps {
  onMoveDown?: () => any;
  onMoveUp?: () => any;
  onDelete?: () => any;
  isDownDisabled?: boolean;
  isUpDisabled?: boolean;
}

export const SongSectionFieldPanel: React.FC<SongSectionFieldPanelProps> = ({
  onMoveDown,
  onMoveUp,
  isDownDisabled,
  isUpDisabled,
  onDelete,
}) => {
  return (
    <div className="btn-group">
      <button
        className="btn btn-square"
        onClick={onMoveDown}
        disabled={isDownDisabled}
        data-testid="down"
      >
        <ArrowDownward />
      </button>
      <button
        className="btn btn-square"
        onClick={onMoveUp}
        disabled={isUpDisabled}
        data-testid="up"
      >
        <ArrowUpward />
      </button>
      <button className="btn btn-square" onClick={onDelete} data-testid="delete">
        <Delete />
      </button>
    </div>
  );
};

interface SongSectionFieldProps extends SongSectionFieldPanelProps {
  name?: string;
  type?: string;
}

export const SongSectionField: React.FC<SongSectionFieldProps> = ({
  name,
  type = "chords",
  onMoveDown,
  onMoveUp,
  isDownDisabled,
  isUpDisabled,
  onDelete,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <TextField fullWidth label={t("song:label/section/title")} name={`${name}.title`} />
      <SongSectionFieldPanel
        onMoveDown={onMoveDown}
        onMoveUp={onMoveUp}
        isDownDisabled={isDownDisabled}
        isUpDisabled={isUpDisabled}
        onDelete={onDelete}
      />
      {type !== "abc" && (
        <ChordChartTextField label={t("song:label/section/body")} name={`${name}.body`} />
      )}
      {type === "abc" && (
        <AbcTextField fullWidth label={t("song:label/section/body")} name={`${name}.body`} />
      )}
    </>
  );
};

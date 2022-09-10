import React from "react";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";

export interface SongSectionFieldPanelProps {
  onMoveDown?: () => void;
  onMoveUp?: () => void;
  onDelete?: () => void;
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
        <MaterialSymbol icon="arrow_downward" />
      </button>
      <button
        className="btn btn-square"
        onClick={onMoveUp}
        disabled={isUpDisabled}
        data-testid="up"
      >
        <MaterialSymbol icon="arrow_upward" />
      </button>
      <button
        className="btn btn-square"
        onClick={onDelete}
        data-testid="delete"
      >
        <MaterialSymbol icon="delete" />
      </button>
    </div>
  );
};

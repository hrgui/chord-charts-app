import React from "react";
import ChordChartView from "./ChordChartView";
import classnames from "classnames";
import Close from "~/ui/icons/CloseIcon";

export interface SongSectionViewProps {
  chordsDisabled?: boolean;
  lyricsDisabled?: boolean;
  overrideKey?: string;
  hide?: boolean;
  songKey?: string;
  section?: any;
  classes?: any;
  onRequestHide?: any;
}

export const SongSectionView = ({
  chordsDisabled,
  lyricsDisabled,
  overrideKey,
  songKey,
  hide,
  section,
  onRequestHide,
}: SongSectionViewProps) => {
  if (hide) {
    return <span data-testid="sectionview-hidden" />;
  }

  return (
    <div className="overflow-hidden bg-base-200 p-4 mb-2 rounded-sm">
      <div className="group cursor-pointer font-semibold flex items-center">
        {section.title && section.title.toUpperCase()}
        <Close
          className="ml-auto opacity-100 sm:hidden sm:ml-2 group-hover:block h-[24px]"
          data-testid="songsection-close"
          onClick={onRequestHide}
          fontSize={"small"}
        />
      </div>
      <pre className={classnames("print-cc-body", "overflow-auto border-none block")}>
        {section.type !== "tab" && (
          <ChordChartView
            overrideKey={overrideKey}
            songKey={songKey}
            chordsDisabled={chordsDisabled}
            value={section.body}
            lyricsDisabled={lyricsDisabled}
          />
        )}
      </pre>
    </div>
  );
};

export default SongSectionView;

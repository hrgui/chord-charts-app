import React from "react";
import { transpose, wrap, allChords } from "@hrgui/chord-charts";
import { useDarkMode } from "~/hooks/useDarkMode";

interface Props {
  value?: string;
  songKey?: string;
  chordsDisabled?: boolean;
  lyricsDisabled?: boolean;
  overrideKey?: string;
}

function chordChartHighlight(input, chordsDisabled, lyricsDisabled?) {
  const isDarkMode = useDarkMode();
  const chordClassName = `chord ${isDarkMode ? "text-[#add8e6]" : "text-[#2159df]"} font-bold`;

  const contents = wrap(input, (x) =>
    chordsDisabled ? "" : `<span class="${chordClassName}">${x}</span>`
  );

  if (lyricsDisabled && !chordsDisabled) {
    return allChords(input)
      .map((x) => `<span class="chord">${x}</span>`)
      .join(" ");
  }

  if (chordsDisabled && lyricsDisabled) {
    return "";
  }

  return contents;
}

export const ChordChartView = ({
  value,
  overrideKey,
  songKey,
  chordsDisabled,
  lyricsDisabled,
}: Props) => {
  if (overrideKey && songKey && songKey !== overrideKey) {
    value = transpose(value!, songKey!, overrideKey!);
  }

  return (
    <div>
      <pre
        dangerouslySetInnerHTML={{
          __html: chordChartHighlight(value, chordsDisabled, lyricsDisabled),
        }}
      />
    </div>
  );
};

export default ChordChartView;

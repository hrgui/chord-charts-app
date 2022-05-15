import React from "react";
import { transpose, wrap, allChords } from "@hrgui/chord-charts";
import { useDarkMode } from "lib/hooks/useDarkMode";

interface Props {
  value?: string;
  songKey?: string;
  chordsDisabled?: boolean;
  lyricsDisabled?: boolean;
  overrideKey?: string;
}

// const Container = styled.div`
//   display: inherit; /* pass through div */
//   .chord {
//     font-family: "Roboto Mono", monospace;
//     color: ${({ theme }) => (theme.palette.type === "dark" ? "#add8e6" : "#2159df")};
//     font-weight: 800;
//   }
// `;

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

const ChordChartView = ({ value, overrideKey, songKey, chordsDisabled, lyricsDisabled }: Props) => {
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

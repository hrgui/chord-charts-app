import * as React from "react";
import Editor from "react-simple-code-editor";
import { wrap } from "@hrgui/chord-charts";
import { useDarkMode } from "~/hooks/useDarkMode";

interface ChordChartTextInputProps {
  value?: string;
  onValueChange?: (code) => any;
  className?: string;
}

export const ChordChartTextInput = ({
  value = "",
  className,
  onValueChange = (code) => null,
}: ChordChartTextInputProps) => {
  const isDarkMode = useDarkMode();
  const chordClassName = `chord ${isDarkMode ? "text-[#add8e6]" : "text-[#2159df]"} font-bold`;

  function chordChartHighlight(input) {
    return wrap(input, (x) => `<span class="${chordClassName}">${x}</span>`);
  }

  return (
    <div>
      <Editor
        className={className}
        value={value}
        onValueChange={(code) => onValueChange(code)}
        highlight={(code) => chordChartHighlight(code)}
        style={{
          color: isDarkMode ? "white" : "black",
          minWidth: "100%",
          fontFamily: '"Fira code", "Fira Mono", monospace',
          marginBottom: 10,
          paddingBottom: 10,
          fontSize: 14,
          borderBottom: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default ChordChartTextInput;

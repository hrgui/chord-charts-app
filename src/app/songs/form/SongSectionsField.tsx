import * as React from "react";
import { FieldArray } from "formik";
import { SongSectionField } from "./SongSectionField";
import Paper from "ui/Paper";

export function SongSectionsField({ name, ...otherProps }) {
  const classes = {
    controlsBar: "p-1 mt-2 mb-2",
    songSection: "p-2 mb-2",
  };
  return (
    <FieldArray name={name} {...otherProps}>
      {({ move, remove, push, form }) => {
        const sections = form.values[name];
        return (
          <>
            <Paper className={classes.controlsBar}>
              <div className="btn-group">
                <button type="button" className="btn" onClick={(e) => push({ body: " " })}>
                  Text Chord Chart
                </button>
              </div>
            </Paper>
            {sections &&
              sections.map((section, i) => (
                <Paper className={classes.songSection} key={i}>
                  <SongSectionField
                    type={section.type}
                    onMoveDown={() => move(i, i + 1)}
                    onMoveUp={() => move(i, i - 1)}
                    isUpDisabled={i === 0}
                    isDownDisabled={i === sections.length - 1}
                    onDelete={() => remove(i)}
                    name={`sections[${i}]`}
                  />
                </Paper>
              ))}
          </>
        );
      }}
    </FieldArray>
  );
}

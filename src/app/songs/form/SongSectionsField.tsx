import * as React from "react";
import { FieldArray } from "formik";
import { SongSectionField } from "./SongSectionField";
import { Paper, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  controlsBar: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  songSection: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export function SongSectionsField({ name, ...otherProps }) {
  const classes = useStyles(otherProps);
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

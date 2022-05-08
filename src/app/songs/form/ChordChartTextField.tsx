import * as React from "react";
import { FastField as Field, FieldConfig } from "formik";
import ChordChartTextInput from "../components/ChordChartTextInput";

interface ChordChartTextFieldProps extends FieldConfig {
  label?;
}

const ChordChartTextField: React.FC<ChordChartTextFieldProps> = ({ name, label, ...props }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <Field name={name} {...props}>
        {({ field, form }) => (
          <ChordChartTextInput
            value={field.value || ""}
            onValueChange={(value) => form.setFieldValue(name, value)}
          />
        )}
      </Field>
    </div>
  );
};

export default ChordChartTextField;

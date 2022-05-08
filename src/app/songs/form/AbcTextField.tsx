import * as React from "react";

import { FastField as Field, FieldConfig } from "formik";

interface AbcTextFieldProps extends FieldConfig {
  label?;
  fullWidth?;
}

const AbcTextField: React.FC<AbcTextFieldProps> = (props) => {
  const { name, ...otherProps } = props;
  return (
    <Field name={name} {...otherProps}>
      {({ field }) => {
        return (
          <div>
            <textarea label={props.label} {...field} />
          </div>
        );
      }}
    </Field>
  );
};

export default AbcTextField;

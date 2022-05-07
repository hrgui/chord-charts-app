import * as React from "react";
import { FastField as Field } from "formik";

import ChordSelect from "../components/ChordSelect";

export const ChordSelectField: React.FC<any> = ({ name, label, ...props }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <Field as={ChordSelect} label={label} name={name} {...props} />
    </div>
  );
};

export default ChordSelectField;

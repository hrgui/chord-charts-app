import * as React from "react";
import MuiTextField from "@material-ui/core/TextField";
import { FastField as Field } from "formik";

export const TextField: React.FC<any> = (props) => {
  return <Field as={MuiTextField} {...props} />;
};

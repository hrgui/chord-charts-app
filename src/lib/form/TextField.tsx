import * as React from "react";
import { FastField as Field } from "formik";
import { twMerge } from "tailwind-merge";

/*
<TextField
                    className={"mb-1"}
                    fullWidth
                    error={errors.title}
                    helperText={<ErrorMessage name="title" />}
                    label={t("song:label/title")}
                    name="title"
                  />
                  */
/*
<div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">What is your name?</span>
    <span class="label-text-alt">Alt label</span>
  </label>
  <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
  <label class="label">
    <span class="label-text-alt">Alt label</span>
    <span class="label-text-alt">Alt label</span>
  </label>
</div>
*/

type TWTextFieldProps = {
  helperText?: React.ReactNode;
  fullWidth?: boolean;
};

export function TWTextField({
  className,
  label,
  helperText,
  fullWidth,
  ...props
}: React.HTMLProps<HTMLInputElement> & TWTextFieldProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input className={twMerge("input input-bordered", className)} {...props} />
      <label className="label">
        <span className="label-text">{helperText}</span>
      </label>
    </div>
  );
}

export const TextField: React.FC<any> = (props) => {
  return <Field as={TWTextField} {...props} />;
};

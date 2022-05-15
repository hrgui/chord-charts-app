import * as React from "react";

type FormControlProps = {
  label: string;
  helperText?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
  htmlFor?: string;
};

export const FormControl: React.FC<FormControlProps> = ({
  label,
  helperText,
  children,
  htmlFor,
}: FormControlProps) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={htmlFor}>
        <span className="label-text">{label}</span>
      </label>
      {children}
      {helperText && (
        <label className="label">
          <span className="label-text">{helperText}</span>
        </label>
      )}
    </div>
  );
};

export default FormControl;

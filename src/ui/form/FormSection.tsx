import React from "react";

type Props = {
  children?: React.ReactNode;
};

const FormSection = ({ children }: Props) => {
  return <div className="p-4 m-4 bg-base-200 rounded-sm">{children}</div>;
};

export default FormSection;

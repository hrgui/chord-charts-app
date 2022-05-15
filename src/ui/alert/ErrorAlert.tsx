import React from "react";

interface Props {
  error: Error;
  message: React.ReactNode;
}

const ErrorAlert = ({ message, error }: Props) => {
  return (
    <div>
      <div>{message}</div>
      <pre>{error.stack}</pre>
    </div>
  );
};

export default ErrorAlert;

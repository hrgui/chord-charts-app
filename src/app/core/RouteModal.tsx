import * as React from "react";
import { Modal } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export function RouteModal(props) {
  const navigate = useNavigate();

  return (
    <Modal
      onClickBackdrop={() => {
        navigate(-1);
      }}
      {...props}
    />
  );
}

export default RouteModal;

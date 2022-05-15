import * as React from "react";
import { Modal, ModalProps } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export function RouteModal(props: ModalProps) {
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

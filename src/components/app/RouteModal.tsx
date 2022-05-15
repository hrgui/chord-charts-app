import * as React from "react";
import { Modal, ModalProps } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export function RouteModal(props: ModalProps) {
  const navigate = useNavigate();

  return (
    <Modal
      className="w-11/12 max-w-6xl max-h-[90vh] h-[90vh]"
      onClickBackdrop={() => {
        navigate(-1);
      }}
      {...props}
    />
  );
}

export default RouteModal;

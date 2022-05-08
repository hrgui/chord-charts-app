import React, { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ToolbarSpacer } from "lib/layout/ToolbarSpacer";
import { getOrCreateElement } from "lib/layout/portalSelector";

const FormActions = ({ children }: any) => {
  const [el, setEl] = useState<any>(null);

  useLayoutEffect(() => {
    const formActions = document.createElement("div");
    formActions.id = "formActions";
    document.body.appendChild(formActions);
    setEl(formActions);
    return () => {
      document.body.removeChild(formActions);
    };
  }, []);

  if (!el) {
    return null;
  }

  return (
    <>
      <ToolbarSpacer />
      <ToolbarSpacer />
      {ReactDOM.createPortal(
        <div className="top-auto fixed w-full p-2 text-right bottom-0 z-50 bg-base-200">
          <div className="flex-row-reverse">{children}</div>
        </div>,
        getOrCreateElement("#formActions")!
      )}
    </>
  );
};

export default FormActions;

import * as React from "react";
import { isFunction } from "utils";
import { Dropdown } from "react-daisyui";
import MaterialSymbol from "ui/icons/MaterialSymbol";

interface SetlistActionsProps {
  children?: React.ReactNode | ((props: { onClose: () => void }) => React.ReactNode);
  id?: any;
}

const ActionsMenu: React.FC<SetlistActionsProps> = (props) => {
  const { children } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <Dropdown horizontal="left" vertical="middle" open={isOpen}>
      <Dropdown.Toggle className="btn-ghost">
        <MaterialSymbol icon="more_vert" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-52">
        {isFunction(children) ? children({ ...props, onClose: handleClose }) : children}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionsMenu;

import * as React from "react";
import MoreVert from "@material-ui/icons/MoreVert";
import { isFunction } from "formik";
import { Dropdown } from "react-daisyui";

interface SetlistActionsProps {
  children?: any;
  id?: any;
}

const ActionsMenu: React.FC<SetlistActionsProps> = (props) => {
  const { children } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  function handleClick(event) {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }

  return (
    <Dropdown horizontal="left" vertical="middle" open={isOpen}>
      <Dropdown.Toggle>
        <MoreVert fontSize="small" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-52">
        {isFunction(children) ? children({ ...props, onClose: handleClose }) : children}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionsMenu;

import * as React from "react";
import { Dialog, DialogProps, makeStyles, Theme } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles<Theme, DialogProps>((theme) => {
  return {};
});

export function RouteModal(props: DialogProps) {
  const classes = useStyles(props);
  const navigate = useNavigate();

  return (
    <Dialog
      onClose={(e, reason) => {
        console.log(reason);
        navigate(-1);
      }}
      classes={classes}
      scroll="paper"
      transitionDuration={{ enter: 0, exit: 0 }}
      {...props}
    />
  );
}

export default RouteModal;

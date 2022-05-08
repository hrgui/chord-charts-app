import React from "react";
import { CurrentSetlistNavMenuPlaceholder } from "../setlists/CurrentSetlistNavMenu";
import { CurrentSongNavMenuPlaceholder } from "../songs/CurrentSongNavMenu";
import { ToolbarSpacer } from "lib/layout/ToolbarSpacer";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";
import { useAppBarActions } from "lib/hooks/useAppBarActions";
import CloseIcon from "ui/icons/CloseIcon";
import Drawer from "ui/Drawer";

export const ToggleControlsPanelAction = ({ children }: { children? }) => {
  const { toggleControlsPanel } = useAppBarActions();

  return <>{children(toggleControlsPanel)}</>;
};

export const ControlsPanel = () => {
  const config = useGetAppBarData();

  if (!config) {
    return null;
  }

  const { navBarState } = config;

  //TODO fixme
  const controlsPanelHidden = true; // this came from config?
  const shouldDrawerBeTemporary = false;
  const variant = shouldDrawerBeTemporary ? "temporary" : "permanent";

  if (navBarState === "main") {
    return null;
  }

  return (
    <Drawer open={!controlsPanelHidden}>
      {!shouldDrawerBeTemporary && <ToolbarSpacer single />}
      {shouldDrawerBeTemporary && (
        <ToggleControlsPanelAction>
          {(toggleControlsPanel) => (
            <button
              className="btn absolute right-0 top-[6px] z-[9001]"
              onClick={(e) => toggleControlsPanel()}
            >
              <CloseIcon />
            </button>
          )}
        </ToggleControlsPanelAction>
      )}
      <div id="songVideo" />
      <CurrentSetlistNavMenuPlaceholder />
      <CurrentSongNavMenuPlaceholder />
    </Drawer>
  );
};

export default ControlsPanel;

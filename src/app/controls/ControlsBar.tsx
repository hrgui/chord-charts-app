import * as React from "react";
import classnames from "classnames";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";
import { ToggleControlsPanelAction } from "./ControlsPanel";

export const SongControlsBarPlaceholder = () => {
  return (
    <>
      <div id="songKey"></div>
      <div id="songControlsBar"></div>
    </>
  );
};

export const ControlsBar = () => {
  const config = useGetAppBarData();

  if (!config) {
    return null;
  }

  const { navBarState, navMenuHidden } = config;

  if (!(navBarState === "setlist" || navBarState === "song")) {
    return null;
  }

  //TODO FIXME
  const shouldDrawerBeTemporary = false;

  return (
    <div
      className={classnames("print-hidden top-auto bottom-0 z-50 bg-base-200", {
        "navMenuShown-desktop": !navMenuHidden && !shouldDrawerBeTemporary,
      })}
    >
      <div>
        <SongControlsBarPlaceholder />
        <div id="setlistControls" />
        <div className="ml-auto">
          <ToggleControlsPanelAction>
            {(toggleControlsPanel) => {
              return <button onClick={toggleControlsPanel}>More</button>;
            }}
          </ToggleControlsPanelAction>
        </div>
      </div>
    </div>
  );
};

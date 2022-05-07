import * as React from "react";
import classnames from "classnames";
import styled from "styled-components/macro";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";
import { NAV_MENU_WIDTH } from "app/core/AppNavMenu";
import { ToggleControlsPanelAction } from "./ControlsPanel";

export const SongControlsBarPlaceholder = () => {
  return (
    <>
      <div id="songKey"></div>
      <div id="songControlsBar"></div>
    </>
  );
};

export const AppBar = styled.div`
  top: auto;
  bottom: 0;
  z-index: ${(props) => props.theme.zIndex.drawer + 1};
  background: ${({ theme }) => theme.palette.background.paper};

  &.navMenuShown-desktop {
    left: ${NAV_MENU_WIDTH};
    width: calc(100vw - ${NAV_MENU_WIDTH});
  }
`;

export const ControlsBarRightPanel = styled.div`
  margin-left: auto;
`;

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
    <AppBar
      className={classnames("print-hidden", {
        "navMenuShown-desktop": !navMenuHidden && !shouldDrawerBeTemporary,
      })}
    >
      <div>
        <SongControlsBarPlaceholder />
        <div id="setlistControls" />
        <ControlsBarRightPanel>
          <ToggleControlsPanelAction>
            {(toggleControlsPanel) => {
              return <div>More</div>;
            }}
          </ToggleControlsPanelAction>
        </ControlsBarRightPanel>
      </div>
    </AppBar>
  );
};

import React from "react";
import AppNavMenu from "./AppNavMenu";
import ContentContainer from "lib/layout/ContentContainer";
import AppBar from "./AppBar";
import ControlsPanel from "app/controls/ControlsPanel";
import { ControlsBar } from "app/controls/ControlsBar";

export function AppLayout({ children, title }: { children?; title? }) {
  return (
    <>
      <div className="flex">
        <AppNavMenu />
        <ContentContainer>
          <AppBar title={title} />
          <ControlsPanel />
          {children}
          <ControlsBar />
        </ContentContainer>
      </div>
    </>
  );
}

export default AppLayout;

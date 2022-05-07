import React from "react";
import styled from "styled-components/macro";
import AppNavMenu from "./AppNavMenu";
import ContentContainer from "lib/layout/ContentContainer";
import AppBar from "./AppBar";
import ControlsPanel from "app/controls/ControlsPanel";
import { ControlsBar } from "app/controls/ControlsBar";

// const AppContainer = styled.div`
//   display: flex;
// `;

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

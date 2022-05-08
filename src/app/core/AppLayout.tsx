import React from "react";
import AppNavMenu from "./AppNavMenu";
import ContentContainer from "lib/layout/ContentContainer";
import AppBar from "./AppBar";

export function AppLayout({ children, title }: { children?; title? }) {
  return (
    <>
      <div className="flex">
        <AppNavMenu />
        <ContentContainer>
          <AppBar title={title} />
          {children}
        </ContentContainer>
      </div>
    </>
  );
}

export default AppLayout;

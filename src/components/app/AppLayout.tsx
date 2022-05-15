import React from "react";
import AppNavMenu from "./AppNavMenu";
import ContentContainer from "lib/layout/ContentContainer";
import AppBar from "./AppBar";

export function AppLayout({
  children,
  appBarEndChildren,
  title,
}: {
  children?;
  title?;
  appBarEndChildren?;
}) {
  return (
    <>
      <div className="flex">
        <AppNavMenu />
        <ContentContainer>
          <AppBar appBarEndChildren={appBarEndChildren} title={title} />
          {children}
        </ContentContainer>
      </div>
    </>
  );
}

export default AppLayout;

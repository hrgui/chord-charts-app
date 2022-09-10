import ContentContainer from "~/ui/layout/ContentContainer";
import { ToolbarSpacer } from "~/ui/layout/ToolbarSpacer";

import AppBar from "./AppBar";
import AppNavMenu from "./AppNavMenu";

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
          <ToolbarSpacer />
          {children}
        </ContentContainer>
      </div>
    </>
  );
}

export default AppLayout;

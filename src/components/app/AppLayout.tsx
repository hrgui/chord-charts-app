import AppNavMenu from "./AppNavMenu";
import ContentContainer from "~/ui/layout/ContentContainer";
import AppBar from "./AppBar";
import { ToolbarSpacer } from "~/ui/layout/ToolbarSpacer";

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

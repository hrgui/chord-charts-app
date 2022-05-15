import * as React from "react";

export interface ContentContainerProps {
  children?: React.ReactNode;
}

export const ContentContainer = ({ children }: ContentContainerProps) => (
  <div className="flex-grow min-height-[100vh] w-full">{children}</div>
);

export default ContentContainer;

import * as React from "react";

export interface ContentContainerProps {
  children?;
  classes?;
}

export function ContentContainer(props: ContentContainerProps) {
  const { children } = props;
  return <div className="flex-grow min-height-[100vh] w-full">{children}</div>;
}

export default ContentContainer;

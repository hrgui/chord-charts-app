import * as React from "react";

export interface ToolbarSpacerProps {
  single?: boolean;
  force?: boolean;
}

export const ToolbarSpacer = ({ single = false, force = false }: ToolbarSpacerProps) => {
  return <div className="min-h-[48px]" />;
};

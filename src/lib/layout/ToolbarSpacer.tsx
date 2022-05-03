import * as React from "react";
import styled from "styled-components/macro";
import { useGetAppBarData } from "../hooks/useGetAppBarData";

export interface ToolbarSpacerProps {
  single?: boolean;
  force?: boolean;
}

const StyledSpacer = styled.div`
  min-height: ${({ theme, isSong }) =>
    !isSong ? theme.mixins.toolbar.minHeight : theme.mixins.toolbar.minHeight * 2}px;
`;

export const ToolbarSpacer = ({ single = false, force = false }: ToolbarSpacerProps) => {
  const config = useGetAppBarData();

  if (!config) {
    return null;
  }

  const { navBarState } = config;
  //TODO FIXME
  const smallWidths = false;
  if (smallWidths && !force) {
    return null;
  }

  return <StyledSpacer isSong={(navBarState === "song" || navBarState === "setlist") && !single} />;
};

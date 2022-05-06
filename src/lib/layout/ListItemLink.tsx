import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import styled from "styled-components/macro";
import NavLink from "lib/router/NavLink";

const activeClassName = `ListItemLink-active`;
const StyledListItem = styled(ListItem).attrs({ activeClassName })`
  &.${activeClassName} {
    background: ${({ theme }) => theme.palette.background.default};
  }
`;

const ListItemLink = ({ ...props }: any) => (
  <StyledListItem button component={NavLink} {...props} />
);

export default ListItemLink;

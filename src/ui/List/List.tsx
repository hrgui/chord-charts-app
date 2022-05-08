import React from "react";

interface Props extends React.HTMLProps<HTMLUListElement> {
  dense?: boolean;
}

export const List = ({ dense, ...props }: Props) => {
  return <ul {...props} />;
};

export default List;

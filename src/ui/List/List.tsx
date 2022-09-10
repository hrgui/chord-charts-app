import React from "react";

interface Props extends React.HTMLProps<HTMLUListElement> {
  dense?: boolean;
}

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export const List = ({ dense, ...props }: Props) => {
  return <ul {...props} />;
};

export default List;

import * as React from "react";
import { Loading } from "./Loading";
import Head from "app/core/Head";

export interface PageProps {
  isLoading?: boolean;
  title: string;
}

const Page = (props) => {
  const { isLoading, children, title } = props;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title={title} />
      {children}
    </>
  );
};

export default Page;

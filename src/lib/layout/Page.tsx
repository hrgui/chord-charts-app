import * as React from "react";
import { Loading } from "./Loading";
import Head from "app/core/Head";
import AppLayout from "app/core/AppLayout";

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
      <AppLayout>{children}</AppLayout>
    </>
  );
};

export default Page;

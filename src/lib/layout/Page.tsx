import * as React from "react";
import { Loading } from "./Loading";
import Head from "app/core/Head";
import AppLayout from "app/core/AppLayout";

export interface PageProps {
  isLoading?: boolean;
  title: string;
  appBarEndChildren?: React.ReactNode;
}

const Page = (props) => {
  const { isLoading, children, title, appBarEndChildren } = props;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title={title} />
      <AppLayout appBarEndChildren={appBarEndChildren} title={title}>
        {children}
      </AppLayout>
    </>
  );
};

export default Page;

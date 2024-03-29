import * as React from "react";

import AppLayout from "~/components/app/AppLayout";
import Head from "~/components/app/Head";

import { Loading } from "./Loading";

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

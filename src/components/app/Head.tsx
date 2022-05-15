import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useGetAppBarData } from "hooks/useGetAppBarData";

interface HeadProps {
  title?: string;
  children?: React.ReactNode;
}

const Head: React.FC<HeadProps> = ({ title, children }: HeadProps) => {
  const config = useGetAppBarData();

  if (!config) {
    return null;
  }

  const { appName } = config;

  const overallTitle = title ? `${title} - ${appName}` : appName;
  return (
    <Helmet>
      <title data-title={title}>{overallTitle}</title>
      {children}
    </Helmet>
  );
};

export default Head;

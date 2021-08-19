import React from "react";
import AppLayout from "@components/layouts/AppLayout";
import { useIllustractionsQuery } from "@api/local/get-mock-illustractions";

const IndexPage = () => {
  const result = useIllustractionsQuery();
  console.log(result);
  return <>Hello Next.js</>;
};

export default IndexPage;

IndexPage.Layout = AppLayout;

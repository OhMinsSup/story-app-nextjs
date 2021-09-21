import React from "react";
import AppLayout from "@components/layouts/AppLayout";
import { useIllustractionsQuery } from "@api/local/get-mock-illustractions";
import MainTemplate from "@components/template/MainTemplate";
import Card from "@components/common/Card";

const IndexPage = () => {
  const result = useIllustractionsQuery();

  const items = result.data?.items ?? [];

  return (
    <MainTemplate>
      {/* TODO: Item */}
    </MainTemplate>
  );
};

export default IndexPage;

IndexPage.Layout = AppLayout;

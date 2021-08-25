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
      <div className="main main-full">
        <ol className="shots-grid group dribbbles container-fluid is-scrolled">
          {items.map((item) => <Card key={item.tokenId} item={item} />)}
        </ol>
      </div>
    </MainTemplate>
  );
};

export default IndexPage;

IndexPage.Layout = AppLayout;

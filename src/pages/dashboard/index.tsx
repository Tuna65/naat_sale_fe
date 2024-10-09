import { useTitle } from "@/hooks/useTitle";
import React, { useState, useEffect } from "react";
import { IShop } from "@/models/shop";
import { shopApi } from "@/apis/shop";
import PackageInfo from "./components/PackageInfo";
import { Col, Row } from "antd";
import CShopInfo from "./components/CShopInfo";
import CReport from "./components/CReport";

type Props = {};

const Dashboard = (props: Props) => {
  useTitle("Dashboard");
  const [detailData, setDetailData] = useState<IShop>();
  const handleGetShop = async () => {
    try {
      const res = await shopApi.findByAlias();
      if (res) setDetailData(res);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetShop();
  }, []);
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <CReport />
      </Col>
      <Col span={17}>
        <CShopInfo shop={detailData as IShop} />
      </Col>
      <Col span={7}>
        <PackageInfo packageId={detailData?.packageId as string} />
      </Col>
    </Row>
  );
};

export default React.memo(Dashboard);

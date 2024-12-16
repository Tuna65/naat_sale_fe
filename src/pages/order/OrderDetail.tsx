import PageContainer from "@/components/PageContainer";
import { IOrder } from "@/models/order";
import { Col, Flex, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerInfo from "./components/CustomerInfo";
import GeneralInfo from "./components/GeneralInfo";
import OrderLineItem from "./components/OrderLineItem";
import PayInfo from "./components/PayInfo";
import useOrderService from "./useOrderService";

const OrderDetail = () => {
  const { id } = useParams();
  const { detailOrder } = useOrderService();
  const [detailData, setDetailData] = useState<IOrder>();

  useEffect(() => {
    id && detailOrder(id, (data) => setDetailData(data));
  }, []);
  
  return (
    <PageContainer>
      <Row gutter={[24, 24]}>
        <Col span={18}>
          <Flex vertical gap={24}>
            <GeneralInfo detailData={detailData} />
            <OrderLineItem data={detailData?.lineItems} />
          </Flex>
        </Col>
        <Col span={6}>
          <Flex vertical gap={24}>
            <PayInfo detailData={detailData} />
            <CustomerInfo />
          </Flex>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default React.memo(OrderDetail);

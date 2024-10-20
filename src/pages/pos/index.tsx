import { Col, Flex, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import BillInfo from "./bill";
import ItemList from "./itemList";
import PosBoard from "./board";
import PosHeader from "./header";
import { useTitle } from "@/hooks/useTitle";

const Pos = () => {
  const { t } = useTranslation();
  useTitle(t('Bán hàng'))

  return (
    <Flex vertical className="h-[100vh] bg-gray-100 overflow-hidden">
      <PosHeader />
      <Row className="flex-1" gutter={[12, 12]}>
        <Col span={18}>
          <Flex vertical className="h-full">
            <PosBoard />
            <ItemList />
          </Flex>
        </Col>
        <Col span={6} className="bg-gray-100">
          <BillInfo />
        </Col>
      </Row>
    </Flex>
  );
};

export default React.memo(Pos);

import { Col, Flex, Row } from "antd";
import React from "react";
import Action from "./Action";
import SearchHeader from "./SearchHeader";
import TabHeader from "./TabHeader";

const PosHeader = () => {
  return (
    <Row className="bg-primary h-[60px] overflow-hidden" align="middle">
      <Col span={18} className="pl-6">
        <Flex gap={32} className="py-3">
          <SearchHeader />
          <TabHeader />
        </Flex>
      </Col>
      <Col span={6} className="mb-5">
        <Action />
      </Col>
    </Row>
  );
};

export default React.memo(PosHeader);

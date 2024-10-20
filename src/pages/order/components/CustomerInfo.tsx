import Text from "@/components/Text";
import { Col, Flex, Row } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = { customerId?: string };

const CustomerInfo = (props: Props) => {
  const { customerId } = props;
  const [detailData, setDetailData] = useState<any>();
  const { t } = useTranslation();
  return (
    <Flex className="bg-white shadow-box rounded-xl p-4" vertical gap={12}>
      <Text type="TITLE4" className="font-medium">
        {t("Thông tin khách hàng")}
      </Text>
      <Row gutter={[6, 6]}>
        <Col span={24}>
          <Flex align="center" gap={10}>
            <Text type="BODY">{t("Tên khách hàng")}:</Text>
            <Text type="HEADLINE">{detailData?.name ?? "Khách lẻ"}</Text>
          </Flex>
        </Col>
        <Col span={24}>
          <Flex align="center" gap={10}>
            <Text type="BODY">{t("Số điện thoại")}:</Text>
            <Text type="HEADLINE">{"---"}</Text>
          </Flex>
        </Col>
        <Col span={24}>
          <Flex align="center" gap={10}>
            <Text type="BODY">{t("Địa chỉ")}:</Text>
            <Text type="HEADLINE">{"---"}</Text>
          </Flex>
        </Col>
        <Col span={24}>
          <Flex align="center" gap={10}>
            <Text type="BODY">{t("Chi nhánh")}:</Text>
            <Text type="HEADLINE">{"---"}</Text>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default React.memo(CustomerInfo);

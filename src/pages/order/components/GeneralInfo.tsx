import Container from "@/components/Container";
import Text from "@/components/Text";
import { TIME_DISPLAYS } from "@/configs/date-format";
import { IOrder } from "@/models/order";
import { func } from "@/utils/func";
import { Col, Flex, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = { loading?: boolean; detailData?: IOrder };

const GeneralInfo = (props: Props) => {
  const { detailData, loading } = props;
  const { t } = useTranslation();
  return (
    <Container type="SPIN" isLoading={loading}>
      <Flex className="bg-white shadow-box rounded-xl p-4" vertical gap={12}>
        <Text type="TITLE4" className="font-medium">
          {t("Thông tin chung")}
        </Text>
        <Row gutter={[6, 6]}>
          <Col span={12}>
            <Flex align="center" gap={10}>
              <Text type="BODY">{t("Mã đơn hàng")}:</Text>
              <Text type="HEADLINE">{detailData?.code ?? "---"}</Text>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex align="center" gap={10}>
              <Text type="BODY">{t("Ngày tạo")}:</Text>
              <Text type="HEADLINE">{func.formatDate(detailData?.createdAt, TIME_DISPLAYS.TIME_DATE)}</Text>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex align="center" gap={10}>
              <Text type="BODY">{t("Người bán")}:</Text>
              <Text type="HEADLINE">{detailData?.createdByName ?? "---"}</Text>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex align="center" gap={10}>
              <Text type="BODY">{t("Chi nhánh")}:</Text>
              <Text type="HEADLINE">{detailData?.locationName ?? "---"}</Text>
            </Flex>
          </Col>
        </Row>
      </Flex>
    </Container>
  );
};

export default React.memo(GeneralInfo);

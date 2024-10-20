import Container from "@/components/Container";
import Status from "@/components/Status";
import Text from "@/components/Text";
import { IOrder } from "@/models/order";
import { Col, Flex, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = { detailData?: IOrder };

const PayInfo = (props: Props) => {
  const {detailData} = props;
  const { t } = useTranslation();
  return (
      <Container type="SPIN">
        <Flex className="bg-white shadow-box rounded-xl p-4" vertical gap={12}>
          <Text type="TITLE4" className="font-medium">
            {t("Thanh toán")}
          </Text>
          <Row gutter={[6, 6]}>
            <Col span={24}>
              <Flex align="center" gap={10}>
                <Text type="BODY">{t("Trạng thái")}:</Text>
                <Status type={detailData?.status as any} />
              </Flex>
            </Col>
          </Row>
        </Flex>
      </Container>
  );
};

export default React.memo(PayInfo);

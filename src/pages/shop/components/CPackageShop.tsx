import Container from "@/components/Container";
import Text from "@/components/Text";
import { IPackage } from "@/models/package";
import usePackageService from "@/pages/package/usePackageService";
import { Col, Flex, Row } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = { id: string };

const CPackageShop = (props: Props) => {
  const { id } = props;
  const { t } = useTranslation();
  const { detailPackage, loading } = usePackageService();

  const [packages, setPackages] = useState<IPackage>();

  useEffect(() => {
    id && detailPackage(id, (data) => setPackages(data));
  }, []);
  return (
    <div className="p-4 bg-white rounded-lg shadow-box">
      <Container isLoading={loading.detail}>
        <Flex vertical gap={12}>
          <Text type="TITLE3">{t("Thông tin gói")}</Text>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Flex align="center" gap={4}>
                <Text type="CAPTION2" className="text-gray-500">
                  {t("Gói")}:
                </Text>
                <Text type="CAPTION1">{packages?.name}</Text>
              </Flex>
            </Col>

            <Col span={12}>
              <Flex align="center" gap={4}>
                <Text type="CAPTION2" className="text-gray-500">
                  {t("Giới hạn nhân viên")}:
                </Text>
                <Text type="CAPTION1">{packages?.totalUser}</Text>
              </Flex>
            </Col>

            <Col span={12}>
              <Flex align="center" gap={4}>
                <Text type="CAPTION2" className="text-gray-500">
                  {t("Giới hạn chi nhánh")}:
                </Text>
                <Text type="CAPTION1">{packages?.totalLocation}</Text>
              </Flex>
            </Col>
          </Row>
        </Flex>
      </Container>
    </div>
  );
};

export default React.memo(CPackageShop);

import Container from "@/components/Container";
import PageContainer from "@/components/PageContainer";
import Text from "@/components/Text";
import { TIME_DISPLAYS } from "@/configs/date-format";
import { useBoolean } from "@/hooks/useBoolean";
import { IShop } from "@/models/shop";
import { func } from "@/utils/func";
import { Button, Col, Flex, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CModalUpPackage from "./components/CModalUpPackage";
import CPackageShop from "./components/CPackageShop";
import CShopStatus from "./components/CShopStatus";
import useShopService from "./useShopService";

const EditShop = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { detailShop, loading } = useShopService();
  const [open, { on, off }] = useBoolean();

  const [detailData, setDetailData] = useState<IShop>();

  useEffect(() => {
    id && detailShop(id, (v) => setDetailData(v));
  }, []);

  return (
    <div className="p-6">
      <PageContainer
        actions={
          <Button type="primary" onClick={on}>
            {t("Nâng cấp gói")}
          </Button>
        }
      >
        <Flex vertical gap={24}>
          <Container isLoading={loading.detail}>
            {detailData && (
              <Flex vertical className="p-4 bg-white shadow-box rounded-lg" gap={12}>
                <Text type="TITLE3">{t("Thông tin chung")}</Text>
                <Flex vertical gap={24}>
                  <Flex gap={12}>
                    <Image
                      width={64}
                      height={64}
                      className="rounded-lg"
                      src={func.avatar(detailData?.name, detailData?.image)}
                    />
                    <Flex vertical gap={6}>
                      <Text type="HEADLINE">{detailData?.name}</Text>
                      <div className="">
                        <CShopStatus shop={detailData as IShop} />
                      </div>
                    </Flex>
                  </Flex>

                  <Row gutter={[12, 12]}>
                    <Col span={12}>
                      <Flex align="center" gap={4}>
                        <Text type="CAPTION2" className="text-gray-500">
                          {t("Alias")}:
                        </Text>
                        <Text type="CAPTION1">{detailData?.shopAlias}</Text>
                      </Flex>
                    </Col>
                    <Col span={12}>
                      <Flex align="center" gap={4}>
                        <Text type="CAPTION2" className="text-gray-500">
                          {t("Loại hình kinh doanh")}:
                        </Text>
                        <Text type="CAPTION1">{"---"}</Text>
                      </Flex>
                    </Col>
                    <Col span={12}>
                      <Flex align="center" gap={4}>
                        <Text type="CAPTION2" className="text-gray-500">
                          {t("Ngày tạo")}:
                        </Text>
                        <Text type="CAPTION1">{func.formatDate(detailData?.createdAt, TIME_DISPLAYS.DATE_ONLY)}</Text>
                      </Flex>
                    </Col>
                    <Col span={12}>
                      <Flex align="center" gap={4}>
                        <Text type="CAPTION2" className="text-gray-500">
                          {t("Ngày hết hạn")}:
                        </Text>
                        <Text type="CAPTION1">
                          {func.formatDate(detailData?.expiredDate as any, TIME_DISPLAYS.DATE_ONLY)}
                        </Text>
                      </Flex>
                    </Col>
                  </Row>
                  <CModalUpPackage detailData={detailData as IShop} off={off} open={open} />
                </Flex>
              </Flex>
            )}
          </Container>

          {detailData && <CPackageShop id={detailData?.packageId} />}
        </Flex>
      </PageContainer>
    </div>
  );
};

export default React.memo(EditShop);

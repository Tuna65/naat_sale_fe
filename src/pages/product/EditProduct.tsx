import PageContainer from "@/components/PageContainer";
import Text from "@/components/Text";
import { Button, Col, Flex, Form, Row } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CImage from "./components/CImage";
import CInventory from "./components/CInventory";
import GeneralInfo from "./components/GeneralInfo";
import useProductService from "./useProductService";
import { useParams } from "react-router-dom";
import { IProduct } from "@/models/product";
import Container from "@/components/Container";
import { useTitle } from "@/hooks/useTitle";

const EditProduct = () => {
  const { t } = useTranslation();
  useTitle(t("Chỉnh sửa sản phẩm"));
  const [form] = Form.useForm();
  const { editProduct, loading, detailProduct } = useProductService();
  const { id } = useParams();
  const [detailData, setDetailData] = useState<IProduct>();
  const onFinish = (v: any) => {
    editProduct(id ?? "", v);
  };

  useEffect(() => {
    id && detailProduct(id, (data) => setDetailData(data));
  }, [id]);
  return (
    <PageContainer
      actions={
        <Button type="primary" onClick={() => form.submit()} loading={loading.edit}>
          {t("Lưu")}
        </Button>
      }
    >
      <Container isLoading={loading.detail} type="SPIN">
        {detailData && (
          <Form initialValues={detailData} form={form} onFinish={onFinish} layout="vertical">
            <Flex vertical gap={24}>
              <Flex vertical gap={12} className="p-4 bg-white shadow-box rounded-lg">
                <Text type="TITLE3">{t("Thông tin chung")}</Text>
                <Row gutter={24}>
                  <Col span={6}>
                    <Form.Item name={"images"}>
                      <CImage />
                    </Form.Item>
                  </Col>
                  <Col span={18}>
                    <GeneralInfo />
                  </Col>
                </Row>
              </Flex>

              <Flex vertical gap={12} className="p-4 bg-white shadow-box rounded-lg">
                <Text type="TITLE3">{t("Quản lý kho")}</Text>
                <Form.Item name={"inventories"}>
                  <CInventory value={detailData.inventories} />
                </Form.Item>
              </Flex>
            </Flex>
          </Form>
        )}
      </Container>
    </PageContainer>
  );
};

export default React.memo(EditProduct);

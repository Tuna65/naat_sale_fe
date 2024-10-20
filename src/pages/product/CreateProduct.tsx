import PageContainer from "@/components/PageContainer";
import Text from "@/components/Text";
import { Button, Col, Flex, Form, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import CImage from "./components/CImage";
import CInventory from "./components/CInventory";
import GeneralInfo from "./components/GeneralInfo";
import useProductService from "./useProductService";

const CreateProduct = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { createProduct, loading } = useProductService();
  const onFinish = (v: any) => createProduct(v);

  return (
    <PageContainer
      actions={
        <Button type="primary" onClick={() => form.submit()} loading={loading.create}>
          {t("Lưu")}
        </Button>
      }
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
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
              <CInventory />
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </PageContainer>
  );
};

export default React.memo(CreateProduct);

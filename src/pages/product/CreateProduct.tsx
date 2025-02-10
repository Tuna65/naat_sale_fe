import { productApi } from "@/apis/product";
import PageContainer from "@/components/PageContainer";
import Text from "@/components/Text";
import useAsync from "@/hooks/useApi";
import { Button, Col, Flex, Form, Row, message } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CImage from "./components/CImage";
import CInventory from "./components/CInventory";
import GeneralInfo from "./components/GeneralInfo";
import { useDispatch, useSelector } from "react-redux";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { keyActions } from "@/store/modules/tanstackKey";
import { func } from "@/utils/func";

const CreateProduct = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const key = useSelector(keySelector);
  const navigate = useNavigate();

  const { execute: createProduct, loading } = useAsync(productApi.create, {
    onSucess: (_response: any) => {
      message.success("Thêm mới sản phẩm thành công!");
      navigate(-1);
      dispatch(keyActions.changeKey({ ...key, product: `product_${func.renderCode()}` }));
    },
    onFailed: (_error) => {},
  });

  const onFinish = (v: any) => createProduct(v);

  return (
    <PageContainer
      actions={
        <Button type="primary" onClick={() => form.submit()} loading={loading}>
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

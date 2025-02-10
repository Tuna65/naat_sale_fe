import { productApi } from "@/apis/product";
import Container from "@/components/Container";
import PageContainer from "@/components/PageContainer";
import Text from "@/components/Text";
import useAsync from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { IProduct } from "@/models/product";
import { keyActions } from "@/store/modules/tanstackKey";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { func } from "@/utils/func";
import { Button, Col, Flex, Form, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CImage from "./components/CImage";
import CInventory from "./components/CInventory";
import GeneralInfo from "./components/GeneralInfo";

const EditProduct = () => {
  const { t } = useTranslation();
  useTitle(t("Chỉnh sửa sản phẩm"));
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const key = useSelector(keySelector);
  const navigate = useNavigate();

  const [detailData, setDetailData] = useState<IProduct>();

  const { execute: editProduct, loading } = useAsync(productApi.edit, {
    onSucess: (_response: any) => {
      message.success("Chỉnh sửa sản phẩm thành công!");
      navigate(-1);
      dispatch(keyActions.changeKey({ ...key, product: `product_${func.renderCode()}` }));
    },
    onFailed: (_error) => {},
  });

  const { execute: detailProduct, loading: loadingDetail } = useAsync(productApi.detail, {
    onSucess: (response: any) => {
      setDetailData(response);
    },
    onFailed: (_error) => {},
  });

  const onFinish = (v: any) => {
    editProduct(id as string, v);
  };

  useEffect(() => {
    id && detailProduct(id);
  }, [id]);

  return (
    <PageContainer
      actions={
        <Button type="primary" onClick={() => form.submit()} loading={loading}>
          {t("Lưu")}
        </Button>
      }
    >
      <Container isLoading={loadingDetail} type="SPIN">
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
                  <CInventory />
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

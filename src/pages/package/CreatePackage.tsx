import { packageApi } from "@/apis/package";
import NumbericInput from "@/components/NumbericInput";
import Text from "@/components/Text";
import useAsync from "@/hooks/useApi";
import { OptionPackage } from "@/utils/option";
import useGlobalService from "@/utils/useGlobalService";
import { Button, Col, Flex, Form, Input, Row, Select, message } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CreatePackage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { rulesForm } = useGlobalService();
  const navigate = useNavigate();

  const { execute: createPackage, loading } = useAsync(packageApi.create, {
    onSucess: (_response: any) => {
      message.success("Thêm gói thành công!");
      navigate(-1);
    },
    onFailed: (_error) => {},
  });

  const onFinish = (v: any) => createPackage(v);

  return (
    <Flex className="w-[500px] p-6 m-auto mt-12 bg-white shadow-box" vertical gap={24}>
      <Text type="TITLE2" className="text-center">
        {t("Thêm gói")}
      </Text>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label={t("Tên gói")} name="name" rules={rulesForm.name}>
          <Input placeholder={t("Nhập tên gói")} />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label={t("Key")} name="key" rules={rulesForm.keyPackage}>
              <Select options={OptionPackage} placeholder={t("Nhập key gói")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("Giá tiền")} name="price" rules={rulesForm.pricePackage}>
              <NumbericInput placeholder={t("Nhập giá")} size="middle" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("Số tài khoản")} name="totalUser" rules={rulesForm.totalUserPackage}>
              <NumbericInput placeholder={t("Nhập số lượng")} size="middle" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("Số chi nhánh")} name="totalLocation" rules={rulesForm.totalLocationPackage}>
              <NumbericInput placeholder={t("Nhập số lượng")} size="middle" className="w-full" />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Button onClick={() => form.submit()} loading={loading} type="primary">
        {t("Thêm mới")}
      </Button>
    </Flex>
  );
};

export default React.memo(CreatePackage);

import Text from "@/components/Text";
import { ICreateShopProps } from "@/types/shop";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import useShopService from "./useShopService";

const CreateShop = (props: ICreateShopProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { ruleForm, createShop } = useShopService();

  const onFinish = (v: any) => createShop(v);

  return (
    <div>
      <div className="w-[400px] m-auto p-6 rounded-lg shadow-box mt-12 border border-solid border-black border-opacity-10">
        <Text type="H3" className="text-center mb-8">
          {t("Đăng ký cửa hàng")}
        </Text>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label={t("Tên cửa hàng")} name="name" rules={ruleForm.name}>
            <Input />
          </Form.Item>
          <Row align={"middle"} gutter={12}>
            <Col span={20}>
              <Form.Item label={t("Địa chỉ truy cập")} name="shopAlias" rules={ruleForm.alias}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <p>.naat.vn</p>
            </Col>
          </Row>
          <Form.Item label={t("Tên đăng nhập")} name="username" rules={ruleForm.username}>
            <Input />
          </Form.Item>
          <Form.Item label={t("Mật khẩu")} name="password" rules={ruleForm.password}>
            <Input type="password" />
          </Form.Item>
          <Form.Item label={t("Email")} name="email" rules={ruleForm.email}>
            <Input type="email" />
          </Form.Item>
        </Form>
        <Button className="w-full" type="primary" size="large" onClick={() => form.submit()}>
          {t("Đăng ký")}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(CreateShop);

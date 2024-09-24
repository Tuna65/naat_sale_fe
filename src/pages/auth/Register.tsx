import { IconGoogle } from "@/assets/Icon";
import Text from "@/components/Text";
import { Button, Flex, Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import useAuthService from "./useAuthService";
import { useNavigate } from "react-router-dom";
import { PATHNAME } from "@/utils/Pathname";
import useUserService from "../user/useUserService";
interface IRegisterProps {}

const Register = (props: IRegisterProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { rulesForm, login } = useAuthService();
  const { create, loading } = useUserService();
  const navigate = useNavigate();
  const onFinish = (v: any) => {
    console.log(v);
    v.shopId = "a1f63599-52e7-4629-8523-cfdc1c5c0d61";
    create(v);
  };

  return (
    <Flex vertical gap={30}>
      <Text type="H2">{t("Đăng ký")}</Text>
      <Form layout="vertical" onFinish={onFinish} form={form} initialValues={{ remember: true }}>
        <Form.Item label={t("Fullname")} name="fullname">
          <Input placeholder={t("Fullname")} />
        </Form.Item>{" "}
        <Form.Item label={t("Username")} name="username" rules={rulesForm.username}>
          <Input placeholder={t("Username")} />
        </Form.Item>
        <Form.Item label={t("Password")} name="password" rules={rulesForm.password}>
          <Input placeholder={t("Password")} type="password" />
        </Form.Item>
        <Form.Item label={t("Phone")} name="phone">
          <Input placeholder={t("Phone")} />
        </Form.Item>{" "}
        <Form.Item label={t("Email")} name="email">
          <Input placeholder={t("Email")} />
        </Form.Item>
      </Form>
      <Flex align="center" gap={20}>
        <Button
          type="primary"
          loading={loading.create}
          onClick={() => form.submit()}
          size="large"
          className="flex-1 h-16"
        >
          {t("Sign in")}
        </Button>
        <div className="cursor-pointer">
          <IconGoogle />
        </div>
      </Flex>
      <Flex align="center" gap={4} className="mt-6" justify="center">
        <Text type="TITLE4">{t("Have account?")}</Text>
        <Text
          type="TITLE4"
          onClick={() => navigate(PATHNAME.AUTH.LOGIN)}
          className="text-primary font-semibold cursor-pointer hover:underline"
        >
          {t("Login")}
        </Text>
      </Flex>
    </Flex>
  );
};

export default React.memo(Register);

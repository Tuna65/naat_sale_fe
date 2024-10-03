import { IconGoogle } from "@/assets/Icon";
import Text from "@/components/Text";
import { Button, Flex, Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import useAuthService from "./useAuthService";
import { useNavigate } from "react-router-dom";
import { PATHNAME } from "@/utils/Pathname";

interface ILoginProps {}

const Login = (props: ILoginProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { rulesForm, login, loading } = useAuthService();
  const navigate = useNavigate();
  const onFinish = (v: any) => login(v);

  return (
    <Flex vertical gap={30}>
      <Text type="H2">{t("Đăng nhập")}</Text>
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item label={t("Username")} name="username" rules={rulesForm.username}>
          <Input placeholder={t("Username")} />
        </Form.Item>
        <Form.Item label={t("Password")} name="password" rules={rulesForm.password}>
          <Input placeholder={t("Password")} type="password" />
        </Form.Item>
      </Form>
      <Flex align="center" gap={20}>
        <Button type="primary" loading={loading} onClick={() => form.submit()} size="large" className="flex-1 h-16">
          {t("Sign in")}
        </Button>
        <div className="cursor-pointer">
          <IconGoogle />
        </div>
      </Flex>
      <Flex align="center" gap={4} className="mt-6" justify="center">
        <Text type="TITLE4">{t("Don't have account?")}</Text>
        <Text
          type="TITLE4"
          onClick={() => navigate(PATHNAME.AUTH.REGISTER)}
          className="text-primary font-semibold cursor-pointer hover:underline"
        >
          {t("Create account")}
        </Text>
      </Flex>
    </Flex>
  );
};

export default React.memo(Login);

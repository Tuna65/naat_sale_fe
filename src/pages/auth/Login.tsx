import { IconFrameLogin, IconGoogle } from "@/assets/Icon";
import Text from "@/components/Text";
import { Button, Flex, Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import useAuthService from "./useAuthService";

interface Props {}

const Login = (props: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { rulesForm, login } = useAuthService();

  const onFinish = (v: any) => login(v);

  return (
    <Flex align="center" justify="center" className="h-[100vh] bg-gray-50">
      <div className="w-[1440px] border border-solid bg-white border-gray-200 xl:rounded-lg overflow-hidden shadow-lg">
        <div className="grid grid-cols-12">
          <Flex vertical justify="center" className="col-span-4 p-10">
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
                <Form.Item
                  label={t("Username")}
                  name="username"
                  rules={rulesForm.username}
                >
                  <Input placeholder={t("Username")} />
                </Form.Item>
                <Form.Item
                  label={t("Password")}
                  name="password"
                  rules={rulesForm.password}
                >
                  <Input placeholder={t("Password")} type="password" />
                </Form.Item>
              </Form>
              <Flex align="center" gap={20}>
                <Button
                  type="primary"
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
                <Text type="TITLE4">{t("Don't have account?")}</Text>
                <Text
                  type="TITLE4"
                  className="text-primary font-semibold cursor-pointer hover:underline"
                >
                  {t("Create account")}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <div className="col-span-8 bg-primary50 px-[70px] py-10">
            <IconFrameLogin />
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default React.memo(Login);

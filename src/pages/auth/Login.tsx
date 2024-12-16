import { authSaleApi } from "@/apis/auth";
import { IconGoogle } from "@/assets/Icon";
import Container from "@/components/Container";
import Text from "@/components/Text";
import { STORAGE } from "@/configs/storage";
import useAsync from "@/hooks/useApi";
import { cookieStorageUtil } from "@/service/storage";
import { authActions } from "@/store/modules/auth";
import { PATHNAME } from "@/utils/Pathname";
import { Button, Flex, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthService from "./useAuthService";

const Login = () => {
  const { t } = useTranslation();
  const naviage = useNavigate();
  const [form] = Form.useForm();
  const { rulesForm } = useAuthService();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = cookieStorageUtil.get(STORAGE.NAAT_TOKEN_KEY);

  const { execute: login, loading } = useAsync(authSaleApi.login, {
    onSucess: (response: any) => {
      dispatch(authActions.setUser(response.data));
      navigate(PATHNAME.DASHBOARD);
      cookieStorageUtil.set(response.data.accessToken, STORAGE.NAAT_TOKEN_KEY);
    },
    onFailed: (_error) => {},
  });

  const onFinish = (v: any) => login(v);

  useEffect(() => {
    if (token) naviage(PATHNAME.DASHBOARD);
  }, []);

  return (
    <Container>
      {!token && (
        <Flex vertical gap={30}>
          <Text type="H2">{t("Đăng nhập")}</Text>
          <Form layout="vertical" onFinish={onFinish} form={form} initialValues={{ remember: true }}>
            <Form.Item label={t("Username")} name="username" rules={rulesForm.username}>
              <Input placeholder={t("Username")} />
            </Form.Item>
            <Form.Item label={t("Password")} name="password" rules={rulesForm.password}>
              <Input placeholder={t("Password")} type="password" />
            </Form.Item>
            <Flex align="center" gap={20}>
              <Button type="primary" loading={loading} htmlType="submit" size="large" className="flex-1 h-16">
                {t("Sign in")}
              </Button>

              <div className="cursor-pointer">
                <IconGoogle />
              </div>
            </Flex>
          </Form>

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
      )}
    </Container>
  );
};

export default React.memo(Login);

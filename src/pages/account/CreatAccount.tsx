import { accountApi } from "@/apis/account";
import PageContainer from "@/components/PageContainer";
import UploadFile from "@/components/UploadFile";
import useAsync from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { Button, Col, Flex, Form, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import CFormAddress from "./components/CFormAddress";
import CFormInfo from "./components/CFormInfo";
import { useNavigate } from "react-router-dom";

const CreatAccount = () => {
  const { t } = useTranslation();
  useTitle(t("Thêm nhân viên"));
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { execute: create, loading } = useAsync(accountApi.create, {
    onSucess: (_response: any) => {
      navigate(-1);
    },
    onFailed: (_error) => {},
  });

  const onFinish = (v: any) => {
    create(v);
  };
  return (
    <PageContainer
      actions={
        <Button loading={loading} type="primary" onClick={() => form.submit()}>
          {t("Lưu")}
        </Button>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row className="bg-white shadow-box py-6 rounded-md" gutter={12}>
          <Col span={4}>
            <UploadFile onChange={() => {}} />
          </Col>
          <Col span={20}>
            <Flex vertical gap={6}>
              <CFormInfo />

              {/* <Flex vertical gap={8}>
                <Text type="TITLE3">{t("Vai trò")}</Text>
                <Row gutter={[12, 0]}>
                  <Col span={8}>
                    <Form.Item label={t("Vai trò")} name="roleId">
                      <InfinityScroll placeholder={t("Chọn vai trò")} keyValue={key.role} apiFunc={roleApi.find} />
                    </Form.Item>
                  </Col>
                </Row>
              </Flex> */}

              <CFormAddress />
            </Flex>
          </Col>
        </Row>
      </Form>
    </PageContainer>
  );
};

export default React.memo(CreatAccount);

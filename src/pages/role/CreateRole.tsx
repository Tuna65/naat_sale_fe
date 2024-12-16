import { roleApi } from "@/apis/role";
import PageContainer from "@/components/PageContainer";
import useAsync from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import useGlobalService from "@/utils/useGlobalService";
import { Button, Flex, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CPermission from "./components/CPermission";

const CreateRole = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useTitle(t("Thêm mới vai trò"));
  const navigate = useNavigate();
  const { rulesForm } = useGlobalService();

  const { execute: createRole, loading } = useAsync(roleApi.create, {
    onSucess: (_response: any) => {
      message.success("Thêm mới thành công!");
      navigate(-1);
    },
    onFailed: (_error) => {},
  });

  const onFinish = (v: any) => createRole(v);

  return (
    <PageContainer
      actions={
        <Flex>
          <Button type="primary" onClick={() => form.submit()} loading={loading}>
            {t("Lưu")}
          </Button>
        </Flex>
      }
    >
      <Form layout="vertical" className="p-4 rounded-lg bg-white shadow-box" form={form} onFinish={onFinish}>
        <Form.Item label={t("Tên vai trò")} name="name" rules={rulesForm.name}>
          <Input placeholder={t("Nhập tên vai trò")} />
        </Form.Item>
        <Form.Item label={t("Mô tả")} name="description">
          <TextArea rows={3} placeholder={t("Nhập mô tả")} />
        </Form.Item>
        <Form.Item label={t("Vai trò")} name="permissions">
          <CPermission />
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default React.memo(CreateRole);

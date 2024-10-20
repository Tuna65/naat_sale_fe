import PageContainer from "@/components/PageContainer";
import { useTitle } from "@/hooks/useTitle";
import { Button, Flex, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useTranslation } from "react-i18next";
import CPermission from "./components/CPermission";
import useRoleService from "./useRoleService";
import useGlobalService from "@/utils/useGlobalService";
import { useNavigate } from "react-router-dom";

const CreateRole = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useTitle(t("Thêm mới vai trò"));
  const navigate = useNavigate();
  const { createRole, loading } = useRoleService();
  const { rulesForm } = useGlobalService();
  const onFinish = (v: any) => createRole(v, (v) => navigate(-1));
  return (
    <PageContainer
      actions={
        <Flex>
          <Button type="primary" onClick={() => form.submit()} loading={loading.create}>
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

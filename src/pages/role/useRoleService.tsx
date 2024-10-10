import { roleApi } from "@/apis/role";
import Text from "@/components/Text";
import { ResPagination, SuccessFunc } from "@/models";
import { IRole } from "@/models/role";
import { IBaseLoading } from "@/types";
import { baseLoading } from "@/utils";
import { Button, Flex, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CheckCircleTwoTone, EditOutlined } from "@ant-design/icons";

const useRoleService = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns = () => [
    {
      title: t("Tên vai trò"),
      dataIndex: "name",
      align: "left",
      key: "name",
      render: (name: any) => <Text type="BODY">{name ?? "---"}</Text>,
    },
    {
      title: t("Mô tả"),
      dataIndex: "description",
      align: "left",
      key: "description",
      render: (description: any) => <Text type="BODY">{description ?? "---"}</Text>,
    },
    {
      title: t("Số lượng"),
      dataIndex: "permission",
      align: "left",
      key: "permission",
      render: (permission: any) => <Text type="BODY">{permission?.length ?? 0}</Text>,
    },

    {
      title: t("Thao tác"),
      dataIndex: "action",
      align: "left",
      key: "action",
      render: (permission: any) => (
        <Flex justify="center">
          <Button type="text" icon={<EditOutlined />} onClick={() => {}} />
        </Flex>
      ),
    },
  ];

  const [loading, setLoading] = useState<IBaseLoading>(baseLoading);

  const createRole = async (body: IRole, success?: SuccessFunc<IRole>) => {
    setLoading((prev) => ({ ...prev, create: true }));
    try {
      setLoading((prev) => ({ ...prev, create: true }));
      const res = await roleApi.create(body);
      if (res) {
        message.success("Thêm mới chi nhánh thành công");
        navigate(-1);
        success && success(res);
      }
      setLoading((prev) => ({ ...prev, create: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const editRole = async (id: string, body: IRole, success: SuccessFunc<IRole>) => {
    setLoading((prev) => ({ ...prev, edit: true }));
    try {
      const res = await roleApi.edit(body, id);
      if (res) {
        message.success("Chỉnh sửa chi nhánh thành công");
        navigate(-1);
        success(res);
      }
      setLoading((prev) => ({ ...prev, edit: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, edit: false }));
    }
  };

  const detailRole = async (id: string, success: SuccessFunc<IRole>) => {
    setLoading((prev) => ({ ...prev, detail: true }));
    try {
      const res = await roleApi.detail(id);
      if (res) {
        success(res);
      }
      setLoading((prev) => ({ ...prev, detail: false }));
    } catch (error) {}
  };

  const findRole = async (query: any, success: (data: ResPagination<IRole>) => void) => {
    try {
      setLoading((prev) => ({ ...prev, find: true }));
      const res = await roleApi.find(query);
      if (res) {
        success(res);
      }
      setLoading((prev) => ({ ...prev, find: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, find: false }));
    }
  };
  return { loading, createRole, editRole, detailRole, findRole, columns };
};

export default useRoleService;

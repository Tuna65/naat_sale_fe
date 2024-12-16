import { roleApi } from "@/apis/role";
import Text from "@/components/Text";
import { ResPagination, SuccessFunc } from "@/models";
import { IRole } from "@/models/role";
import { keyActions } from "@/store/modules/tanstackKey";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { IBaseLoading } from "@/types";
import { baseLoading } from "@/utils";
import { func } from "@/utils/func";
import { EditOutlined } from "@ant-design/icons";
import { Button, Flex, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useRoleService = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const key = useSelector(keySelector);

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
      dataIndex: "permissions",
      align: "center",
      key: "permissions",
      render: (permissions: any) => <Text type="BODY">{permissions?.length ?? 0}</Text>,
    },

    {
      title: t("Thao tác"),
      dataIndex: "action",
      align: "center",
      key: "action",
      render: (permission: any) => (
        <Flex justify="center">
          <Button type="text" icon={<EditOutlined />} onClick={() => {}} />
        </Flex>
      ),
    },
  ];

  const [loading, setLoading] = useState<IBaseLoading>(baseLoading);

  const editRole = async (id: string, body: IRole, success: SuccessFunc<IRole>) => {
    setLoading((prev) => ({ ...prev, edit: true }));
    try {
      const res = await roleApi.edit(body, id);
      if (res) {
        message.success("Chỉnh sửa chi nhánh thành công");
        navigate(-1);
        success(res);
        dispatch(keyActions.changeKey({ ...key, role: `role_${func.renderCode()}` }));
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

  const deleteRole = async (id: string, success: SuccessFunc<IRole>) => {
    setLoading((prev) => ({ ...prev, detail: true }));
    try {
      const res = await roleApi.delete(id);
      if (res) {
        success(res);
        message.success(t("Xóa vai trò thành công!"));
        dispatch(keyActions.changeKey({ ...key, role: `role_${func.renderCode()}` }));
      }
      setLoading((prev) => ({ ...prev, detail: false }));
    } catch (error) {}
  };

  return { loading, editRole, detailRole, columns, deleteRole };
};

export default useRoleService;

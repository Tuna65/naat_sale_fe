import { userApi } from "@/apis/user";
import Text from "@/components/Text";
import { IUser } from "@/models/user";
import { IBaseLoading } from "@/types";
import { baseLoading } from "@/utils";
import { func } from "@/utils/func";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const useUserService = () => {
  const { t } = useTranslation();
  const rulesForm = {
    username: [
      {
        required: true,
        message: t("Tên đăng nhập không được để trống"),
      },
      {
        pattern: /^[a-z0-9._]+$/,
        message: 'Username chỉ chứa chữ thường và ký tự đặc biệt là "." hoặc "_"',
      },
    ],
    password: [
      {
        required: true,
        message: t("Mật khẩu không được để trống"),
      },
    ],
  };

  const columns = [
    {
      title: t("Fullname"),
      dataIndex: "fullname",
      width: 20,
      key: "fullName",
      render: (fullname: any, user: IUser) => (
        <Flex>
          <Avatar src={user.image ?? func.defaultAvatar(fullname)} />
          <Text type="CAPTION2">{fullname}</Text>
        </Flex>
      ),
    },
    {
      title: t("Phone"),
      dataIndex: "phone",
      width: 20,
      key: "phone",
      render: (phone: any) => <Text type="CAPTION2">{phone ?? "---"}</Text>,
    },
    {
      title: t("Email"),
      dataIndex: "email",
      width: 20,
      key: "email",
      render: (email: any) => <Text type="CAPTION2">{email ?? "---"}</Text>,
    },
    {
      title: t("Role"),
      dataIndex: "role",
      width: 20,
      key: "role",
      render: (role: any) => <Text type="CAPTION2">{role ?? "---"}</Text>,
    },
    {
      title: t("Action"),
      key: "action",
      dataIndex: "key",
      width: 100,
      align: "center",
      render: (id: string, user: IUser) => (
        <div className="flex items-center">
          <Button
            type="text"
            icon={<EditOutlined />}
            // onClick={() => navigate(PATHNAME.MEMBER.UPDATE_ID(user?.id))}
          />
        </div>
      ),
    },
  ];

  const [loading, setLoading] = useState<IBaseLoading>(baseLoading);

  const create = async (body: IUser) => {
    setLoading((prev) => ({ ...prev, create: true }));
    try {
      setLoading((prev) => ({ ...prev, create: true }));
      const res = await userApi.create(body);
      if (res) {
        message.success("Thêm mới nhân viên thành công");
      }
      setLoading((prev) => ({ ...prev, create: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };
  return { columns, rulesForm, loading, create };
};

export default useUserService;

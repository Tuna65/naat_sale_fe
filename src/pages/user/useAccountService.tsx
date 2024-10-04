import { accountApi } from "@/apis/account";
import Text from "@/components/Text";
import { STORAGE } from "@/configs/storage";
import { ResPagination } from "@/models";
import { IRole } from "@/models/role";
import { IUser } from "@/models/user";
import { cookieStorageUtil } from "@/service/storage";
import { authActions } from "@/store/modules/auth";
import { IBaseLoading } from "@/types";
import { IQueryAccount } from "@/types/account";
import { baseLoading } from "@/utils";
import { PATHNAME } from "@/utils/Pathname";
import { func } from "@/utils/func";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAccountService = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dataIndex: "name",
      width: 20,
      key: "name",
      render: (name: any, user: IUser) => (
        <Flex align="center" gap={4}>
          <Avatar src={user.image ?? func.defaultAvatar(name)} />
          <Text type="CAPTION2">{name}</Text>
        </Flex>
      ),
    },
    {
      title: t("Số điện thoại"),
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
      title: t("Vai trò"),
      dataIndex: "role",
      width: 20,
      key: "role",
      render: (role: IRole, user: IUser) => (
        <Text type="CAPTION2">{user.isOwner ? t("Chủ cửa hàng") : role.name ?? "---"}</Text>
      ),
    },
    {
      title: t("Thao tác"),
      key: "action",
      dataIndex: "key",
      width: 100,
      align: "center",
      render: (id: string, user: IUser) => (
        <div className="flex items-center justify-center">
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
      const res = await accountApi.create(body);
      if (res) {
        message.success("Thêm mới nhân viên thành công");
      }
      setLoading((prev) => ({ ...prev, create: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const detailToken = async () => {
    try {
      const res = await accountApi.detailByToken();
      if (res) dispatch(authActions.setUser(res));
    } catch (error) {
      navigate(PATHNAME.AUTH.LOGIN);
      dispatch(authActions.clear());
      cookieStorageUtil.remove(STORAGE.NAAT_TOKEN_KEY);
      message.error('Token hết hạn hoặc không hợp lệ')
    }
  };

  const findAccount = async (query: IQueryAccount, success: (data: ResPagination<IUser>) => void) => {
    try {
      const res = await accountApi.find(query);
      if (res) {
        success(res);
      }
    } catch (error) {}
  };
  return { columns, rulesForm, loading, create, detailToken, findAccount };
};

export default useAccountService;

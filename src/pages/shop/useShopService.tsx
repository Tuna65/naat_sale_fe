import { shopApi } from "@/apis/shop";
import { IconOrder } from "@/assets/Icon";
import Status from "@/components/Status";
import { ResPagination } from "@/models";
import { IShop } from "@/models/shop";
import { QueryShop } from "@/types/shop";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const useShopService = () => {
  const { t } = useTranslation();
  const ruleForm = {
    name: [
      {
        required: true,
        message: t("Tên cửa hàng không được để trống"),
      },
    ],
    username: [
      {
        required: true,
        message: t("Tên đăng nhập không được để trống"),
      },
      {
        pattern: /^[a-z0-9.@]+$/,
        message: 'Tên đăng nhập chỉ viết thường, ký tự ". @" và số',
      },
    ],
    password: [
      {
        required: true,
        message: t("Mật khẩu không được để trống"),
      },
    ],
    email: [
      {
        required: true,
        message: t("Email không được để trống"),
      },
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Email không hợp lệ!",
      },
    ],
    alias: [
      {
        required: true,
        message: t("Địa chỉ truy cập không được để trống"),
      },
      {
        pattern: /^[a-z0-9.-]+$/,
        message: 'Alias chỉ được chứa chữ thường và ký tự ".", "-"',
      },
    ],
  };

  const columns = [
    {
      title: t("Tên cửa hàng"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Store alias"),
      dataIndex: "shopAlias",
      key: "shopAlias",
      render: (shopAlias: any) => shopAlias ?? "---",
    },
    {
      title: t("Số điện thoại"),
      dataIndex: "phone",
      key: "phone",
      render: (phone: any) => phone ?? "---",
    },
    {
      title: t("Trạng thái"),
      dataIndex: "status",
      key: "status",
      render: (status: any) => <Status type={status ?? "INACTIVE"} />,
    },
    {
      title: t("Thao tác"),
      dataIndex: "action",
      key: "action",
      render: () => (
        <div>
          <div className="cursor-pointer">
            <IconOrder />
          </div>
        </div>
      ),
    },
  ];

  const createShop = async (body: IShop) => {
    try {
      const res = await shopApi.create(body);
      if (res) {
        message.success("Đăng ký cửa hàng thành công!");
      }
    } catch (error) {}
  };

  const findShop = async (query: QueryShop, success: (data: ResPagination<IShop>) => void) => {
    try {
      const res = await shopApi.find(query);
      if (res) {
        console.log(res);
        success(res);
      }
    } catch (error) {}
  };
  return { ruleForm, createShop, findShop, columns };
};

export default useShopService;

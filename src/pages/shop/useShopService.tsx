import { shopApi } from "@/apis/shop";
import { ResPagination, SuccessFunc, VoidFunc } from "@/models";
import { IShop } from "@/models/shop";
import { IBaseLoading } from "@/types";
import { BodyUpPackage, QueryShop } from "@/types/shop";
import { baseLoading } from "@/utils";
import { PATHNAME } from "@/utils/Pathname";
import { EditOutlined } from "@ant-design/icons";
import { Button, Flex, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CShopPackage from "./components/CShopPackage";
import CShopStatus from "./components/CShopStatus";
import Text from "@/components/Text";
import { func } from "@/utils/func";
import { TIME_DISPLAYS } from "@/configs/date-format";

const useShopService = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      align: "center",
      key: "phone",
      render: (phone: any) => phone ?? "---",
    },
    {
      title: t("Trạng thái"),
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (status: any, record: IShop) => <CShopStatus shop={record} />,
    },
    {
      title: t("Gói sử dụng"),
      dataIndex: "packageId",
      key: "packageId",
      align: "center",
      render: (packageId: any, record: IShop) => <CShopPackage shop={record} />,
    },
    {
      title: t("Ngày hết hạn"),
      dataIndex: "expiredDate",
      key: "expiredDate",
      align: "center",
      render: (expiredDate: any, record: IShop) => (
        <Text type="BODY">{expiredDate ? func.formatDate(expiredDate, TIME_DISPLAYS.DATE_ONLY) : "---"}</Text>
      ),
    },
    {
      title: t("Thao tác"),
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (action: any, record: IShop) => (
        <Flex justify="center">
          <Button type="text" icon={<EditOutlined />} onClick={() => navigate(PATHNAME.SHOP.EDIT_ID(record?.id))} />
        </Flex>
      ),
    },
  ];

  const [loading, setLoading] = useState<IBaseLoading>(baseLoading);
  const createShop = async (body: IShop) => {
    setLoading((prev) => ({ ...prev, create: true }));
    try {
      const res = await shopApi.create(body);
      if (res) {
        message.success("Đăng ký cửa hàng thành công!");
      }
      setLoading((prev) => ({ ...prev, create: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const editShop = async (id: string, body: IShop) => {
    setLoading((prev) => ({ ...prev, edit: true }));
    try {
      const res = await shopApi.edit(body, id);
      if (res) {
        message.success("Chỉnh sửa cửa hàng thành công!");
      }
      setLoading((prev) => ({ ...prev, edit: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, edit: false }));
    }
  };

  const findShop = async (query: QueryShop, success: (data: ResPagination<IShop>) => void) => {
    setLoading((prev) => ({ ...prev, find: true }));
    try {
      const res = await shopApi.find(query);
      if (res) {
        success(res);
      }
      setLoading((prev) => ({ ...prev, find: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, find: false }));
    }
  };

  const detailShop = async (id: string, success: SuccessFunc<IShop>) => {
    setLoading((prev) => ({ ...prev, detail: true }));
    try {
      const res = await shopApi.detail(id);
      if (res) {
        success(res);
      }
      setLoading((prev) => ({ ...prev, detail: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, detail: false }));
    }
  };

  const upPackage = async (body: BodyUpPackage, success: VoidFunc) => {
    setLoading((prev) => ({ ...prev, edit: true }));
    try {
      const res = await shopApi.upPackage(body);
      if (res) {
        message.success("Nâng cấp gói thành công!");
        success();
      }
      setLoading((prev) => ({ ...prev, edit: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, edit: false }));
    }
  };
  return { ruleForm, createShop, findShop, columns, loading, editShop, detailShop, upPackage };
};

export default useShopService;

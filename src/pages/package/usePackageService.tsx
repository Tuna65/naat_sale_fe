import { packageApi } from "@/apis/package";
import Text from "@/components/Text";
import { ResPagination, SuccessFunc } from "@/models";
import { IPackage } from "@/models/package";
import { IBaseLoading } from "@/types";
import { baseLoading } from "@/utils";
import { func } from "@/utils/func";
import { Button, Flex, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PATHNAME } from "@/utils/Pathname";

const usePackageService = () => {
  const [loading, setLoading] = useState<IBaseLoading>(baseLoading);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      title: t("Tên gói"),
      dataIndex: "name",
      align: "left",
      key: "name",
      render: (name: string) => <Text type="BODY">{name}</Text>,
    },
    {
      title: t("Tài khoản giói hạn"),
      dataIndex: "totalUser",
      align: "center",
      key: "totalUser",
      render: (totalUser: string) => <Text type="BODY">{`${totalUser} hoạt động`}</Text>,
    },
    {
      title: t("Chi nhánh giới hạn"),
      dataIndex: "totalLocation",
      align: "center",
      key: "totalLocation",
      render: (totalLocation: string) => <Text type="BODY">{`${totalLocation} chi nhánh`}</Text>,
    },
    {
      title: t("Giá"),
      dataIndex: "price",
      align: "right",
      key: "price",
      render: (price: string) => (
        <Text type="HEADLINE" className="text-primary">
          {func.numberWithDots(price, "VND")}
        </Text>
      ),
    },
    {
      title: t("Chi nhánh giới hạn"),
      dataIndex: "totalLocation",
      align: "center",
      key: "totalLocation",
      render: (totalLocation: string, record: IPackage) => (
        <Flex justify="center">
          <Button type="text" icon={<EditOutlined />} onClick={() => navigate(PATHNAME.PACKAGE.EDIT_ID(record?.id))} />
        </Flex>
      ),
    },
  ];

  const deletePackage = async (id: string) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      const res = await packageApi.delete(id);
      if (res) {
        message.success("Xóa gói thành công!");
      }
      setLoading((prev) => ({ ...prev, delete: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return { columns, loading, deletePackage };
};

export default usePackageService;

import { locationApi } from "@/apis/location";
import Status from "@/components/Status";
import Text from "@/components/Text";
import { ResPagination, SuccessFunc } from "@/models";
import { ILocation } from "@/models/location";
import { IBaseLoading } from "@/types";
import { baseLoading } from "@/utils";
import { CheckCircleTwoTone, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useLocationService = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const columns = (onEdit: SuccessFunc<ILocation>) => [
    {
      title: t("Tên chi nhánh"),
      dataIndex: "name",
      align: "left",
      key: "name",
      render: (name: any) => <Text type="BODY">{name ?? "---"}</Text>,
    },
    {
      title: t("Số điện thoại"),
      dataIndex: "phone",
      align: "center",
      key: "phone",
      render: (phone: any) => <Text type="BODY">{phone ?? "---"}</Text>,
    },
    {
      title: t("Địa chỉ"),
      dataIndex: "address",
      align: "left",
      key: "address",
      render: (address: any, record: ILocation) => (
        <Text type="BODY">{`${address}, ${record.ward}, ${record.district}, ${record.city},`}</Text>
      ),
    },
    {
      title: t("Mặc định"),
      dataIndex: "isDefault",
      align: "center",
      key: "isDefault",
      render: (isDefault: any, record: ILocation) => isDefault && <CheckCircleTwoTone twoToneColor="#52c41a" />,
    },
    {
      title: t("Trạng thái"),
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (status: any, record: ILocation) => <Status type={status} />,
    },
    {
      title: t("Thao tác"),
      dataIndex: "action",
      align: "center",
      key: "action",
      render: (address: any, record: ILocation) => (
        <Flex justify="center">
          <Tooltip title={t("Sửa")}>
            <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
          </Tooltip>
          {!record.isDefault && (
            <Tooltip title={t("Xóa")}>
              <Button type="text" icon={<DeleteOutlined />} onClick={() => onEdit(record)} />
            </Tooltip>
          )}
        </Flex>
      ),
    },
  ];

  const [loading, setLoading] = useState<IBaseLoading>(baseLoading);

  const create = async (body: ILocation, success?: SuccessFunc<ILocation>) => {
    setLoading((prev) => ({ ...prev, create: true }));
    try {
      setLoading((prev) => ({ ...prev, create: true }));
      const res = await locationApi.create(body);
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

  const editLocation = async (id: string, body: ILocation, success: SuccessFunc<ILocation>) => {
    setLoading((prev) => ({ ...prev, edit: true }));
    try {
      const res = await locationApi.edit(body, id);
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

  const detailLocation = async (id: string, success: SuccessFunc<ILocation>) => {
    setLoading((prev) => ({ ...prev, detail: true }));
    try {
      const res = await locationApi.detail(id);
      if (res) {
        success(res);
      }
      setLoading((prev) => ({ ...prev, detail: false }));
    } catch (error) {}
  };

  const findLocation = async (query: any, success: (data: ResPagination<ILocation>) => void) => {
    try {
      setLoading((prev) => ({ ...prev, find: true }));
      const res = await locationApi.find();
      if (res) {
        success(res);
      }
      setLoading((prev) => ({ ...prev, find: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, find: false }));
    }
  };
  return { loading, create, editLocation, detailLocation, findLocation, columns };
};

export default useLocationService;

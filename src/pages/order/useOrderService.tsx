import { orderApi } from "@/apis/order";
import Status from "@/components/Status";
import Text from "@/components/Text";
import { TIME_DISPLAYS } from "@/configs/date-format";
import { SuccessFunc } from "@/models";
import { IOrder } from "@/models/order";
import { IBaseLoading } from "@/types";
import { ILineItem } from "@/types/pos";
import { baseLoading } from "@/utils";
import { func } from "@/utils/func";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useOrderService = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const columns = () => [
    {
      title: t("Mã đơn hàng"),
      dataIndex: "code",
      align: "left",
      key: "code",
      render: (name: any, record: IOrder) => (
        <Text
          className="hover:underline hover:cursor-pointer"
          type="BODY"
          onClick={() => navigate(record?.id as string)}
        >
          {name ?? "---"}
        </Text>
      ),
    },
    {
      title: t("Ngày tạo"),
      dataIndex: "createdAt",
      align: "center",
      key: "createdAt",
      render: (createdAt: string) => <Text type="BODY">{func.formatDate(createdAt, TIME_DISPLAYS.TIME_DATE)}</Text>,
    },
    {
      title: t("Người bán"),
      dataIndex: "createdByName",
      align: "left",
      key: "createdByName",
      render: (createdByName: any) => <Text type="BODY">{createdByName ?? "---"}</Text>,
    },
    {
      title: t("Chi nhánh"),
      dataIndex: "locationName",
      align: "left",
      key: "locationName",
      render: (locationName: any) => <Text type="BODY">{locationName ?? "---"}</Text>,
    },
    {
      title: t("Khách hàng"),
      dataIndex: "customerName",
      align: "center",
      key: "customerName",
      render: (customerName: any) => <Text type="BODY">{customerName ?? "khách lẻ"}</Text>,
    },
    {
      title: t("Trạng thái"),
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (status: any, record: IOrder) => <Status type={status} />,
    },
    {
      title: t("Số sản phẩm"),
      dataIndex: "lineItems",
      align: "center",
      key: "lineItems",
      render: (lineItems: ILineItem[]) => <Text type="BODY">{lineItems?.length ?? "---"}</Text>,
    },
    {
      title: t("Tổng tiền hàng"),
      dataIndex: "lineItems",
      align: "right",
      key: "lineItems",
      render: (lineItems: ILineItem[]) => {
        const amount = lineItems?.reduce((acc, item) => {
          const total = item?.price * item?.quantity;
          return acc + total;
        }, 0);
        return (
          <Text type="BODY" className="font-semibold">
            {func.numberWithDots(amount ?? 0)}
          </Text>
        );
      },
    },
  ];
  const [loading, setLoading] = useState<IBaseLoading>(baseLoading);

  const detailOrder = async (id: string, success: SuccessFunc<IOrder>) => {
    setLoading((prev) => ({ ...prev, detail: true }));
    try {
      const res = await orderApi.detail(id);
      if (res) {
        success(res);
      }
      setLoading((prev) => ({ ...prev, detail: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, detail: false }));
    }
  };
  return { columns, detailOrder, loading };
};

export default useOrderService;

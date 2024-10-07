import Text from "@/components/Text";
import { EShopStatus } from "@/enum/EShopStatus";
import { IShop } from "@/models/shop";
import { OptionShopStatus } from "@/utils/option";
import { CaretDownOutlined } from "@ant-design/icons";
import { Flex, MenuProps, Popover } from "antd";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useShopService from "../useShopService";

type Props = { shop: IShop };

const CShopStatus = (props: Props) => {
  const { t } = useTranslation();
  const { shop } = props;

  const [type, setType] = useState<EShopStatus>(shop.status);
  const { editShop, loading } = useShopService();

  const statusStyle = useMemo(() => {
    switch (type) {
      case "ACTIVE": {
        return {
          text: t("Hoạt động"),
          border: "bg-green-100",
          textColor: "text-green-500",
        };
      }
      case "INACTIVE": {
        return {
          text: t("Ngừng hoạt động"),
          border: " bg-gray-100",
          textColor: "text-gary-500",
        };
      }

      case "PENDING": {
        return {
          text: t("Chờ duyệt"),
          border: "bg-yellow-100",
          textColor: "text-yellow-500",
        };
      }
    }
  }, [type]);

  const handleChangeStatus = async (status: EShopStatus) => {
    editShop(shop?.id ?? "", { ...shop, status });
    setType(status);
  };

  return (
    <Popover
      placement="bottom"
      className="cursor-pointer"
      content={
        <Flex vertical>
          {OptionShopStatus.map((e, idx) => {
            return (
              <Text
                type="BODY"
                key={`shop-status-${idx}`}
                className="py-1 cursor-pointer hover:underline hover:text-primary"
                onClick={() => handleChangeStatus(e.value as EShopStatus)}
              >
                {t(e.label as string)}
              </Text>
            );
          })}
        </Flex>
      }
    >
      <Flex className={`px-3 py-2 rounded-lg inline-flex ${statusStyle?.border}`} align="center" gap={8}>
        <Text className={`${statusStyle?.textColor}`} type="CAPTION2">
          {statusStyle?.text}
        </Text>
        <CaretDownOutlined />
      </Flex>
    </Popover>
  );
};

export default React.memo(CShopStatus);

const items: MenuProps["items"] = [
  {
    key: EShopStatus.ACTIVE,
    label: <Text type="BODY">Hoạt động</Text>,
  },
  {
    key: EShopStatus.PENDING,
    label: <Text type="BODY">Chờ duyệt</Text>,
  },
  {
    key: EShopStatus.INACTIVE,
    label: <Text type="BODY">Ngừng hoạt động</Text>,
  },
];

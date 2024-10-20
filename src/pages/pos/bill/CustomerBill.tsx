import { accountApi } from "@/apis/account";
import InfinityScroll from "@/components/InfinityScroll";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Space, Tooltip } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CustomerBill = () => {
  const { t } = useTranslation();
  const key = useSelector(keySelector);
  return (
    <Flex className="p-3 " gap={10}>
      <InfinityScroll
        placeholder={t("Tìm khách hàng")}
        apiFunc={accountApi.query}
        keyValue={key.product}
        className="w-full"
      />
      <Space className="px-2 cursor-pointer rounded-[50%] hover:bg-gray-200">
        <Tooltip title={t("Thêm khách hàng")}>
          <PlusOutlined />
        </Tooltip>
      </Space>
    </Flex>
  );
};

export default React.memo(CustomerBill);

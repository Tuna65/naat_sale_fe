import { Flex } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import BillDetail from "./BillDetail";
import CustomerBill from "./CustomerBill";
import SubmitOrder from "./SubmitOrder";

const BillInfo = () => {
  const { t } = useTranslation();
  return (
    <Flex className="h-full pr-3" vertical>
      <Flex className="w-full h-full my-3 rounded-lg shadow-box bg-white" vertical justify="space-between">
        <Flex className="" vertical gap={12}>
          <CustomerBill />
          <BillDetail />
        </Flex>

        <SubmitOrder />
      </Flex>
    </Flex>
  );
};

export default React.memo(BillInfo);

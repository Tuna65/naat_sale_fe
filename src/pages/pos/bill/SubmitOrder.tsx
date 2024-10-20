import { defaultTab } from "@/store/modules/pos";
import { locationSelector, tabsSelector } from "@/store/modules/pos/selector";
import { Button, Flex, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { cloneDeep } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import usePosService from "../usePosService";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/apis/product";

const SubmitOrder = () => {
  const { t } = useTranslation();
  const tabs = useSelector(tabsSelector);
  const location = useSelector(locationSelector);
  const key = useSelector(keySelector);
  const { createOrder, loading, setTab } = usePosService();

  const { isPending, error, data, refetch, isLoading } = useQuery({
    queryKey: [key.product, { page: 1, limit: 12, locationId: location?.id }],
    queryFn: productApi.query,
    staleTime: 600000,
    enabled: !!location?.id,
    retry: 1,
  });

  const updateValue = (v: string) => {
    const newTabs = cloneDeep(tabs);
    const tabActive = newTabs.find((t) => t.isActive);
    if (!tabActive) return;
    tabActive.note = v;
    setTab(newTabs);
  };

  const submitOrder = () => {
    const newTabs = cloneDeep(tabs);
    const tabActive = newTabs.find((t) => t.isActive);
    if (!tabActive) return;
    const { lineItems, discount, note } = tabActive;
    if (lineItems.length == 0) return message.warning("Vui lòng chọn sản phẩm");
    const order: any = {
      lineItems,
      discount,
      note,
      locationId: location?.id,
      locationName: location?.name,
      status: "COMPLETED",
    };
    createOrder(order, () => {
      refetch();
      successOrder(tabActive.id);
    });
  };

  const successOrder = (tabId: number) => {
    const tabNumber = tabs.map((t) => t.id);

    if (tabNumber.length == 1) setTab([defaultTab]);
    else {
      const newTabs = cloneDeep(tabs.filter((t) => t.id !== tabId));
      const tab = newTabs.find((t) => t.id == Math.min(...newTabs.map((ts) => ts.id)));
      if (!tab) return;
      tab.isActive = true;
      setTab(newTabs);
    }
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "F4") submitOrder();
  });

  return (
    <Flex className="p-2" vertical gap={16}>
      <TextArea rows={3} placeholder={t("Nhập ghi chú")} onChange={(e) => updateValue(e.target.value)} />
      <Button loading={loading.create} type="primary" size="large" className="w-full h-16" onClick={submitOrder}>
        {t("Thanh toán (F4)")}
      </Button>
    </Flex>
  );
};

export default React.memo(SubmitOrder);

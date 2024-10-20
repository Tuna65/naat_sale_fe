import Text from "@/components/Text";
import { posActions } from "@/store/modules/pos";
import { tabsSelector } from "@/store/modules/pos/selector";
import { Tab } from "@/types/pos";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Flex, Space } from "antd";
import { cloneDeep } from "lodash";
import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import usePosService from "../usePosService";

const TabHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tabs = useSelector(tabsSelector);
  const { setTab } = usePosService();

  const tabActive = useMemo(() => {
    const newTabs = cloneDeep(tabs);
    return newTabs.find((t) => t.isActive);
  }, [tabs]);

  const deleteTab = (id: number) => {
    const newTab = cloneDeep(tabs.filter((t) => t.id !== id));
    if (id == tabActive?.id) {
      const tab = newTab.find((t) => t.id == Math.min(...newTab.map((ts) => ts.id)));
      if (!tab) return;
      tab.isActive = true;
    }
    setTab(newTab);
  };

  return (
    <Flex gap={12}>
      {tabs.map((tab, idx) => {
        const activeClass = "cursor-pointer rounded-t-lg bg-white px-6 relative top-[0px] h-[60px]";
        const normalClass = "cursor-pointer rounded bg-primary50 h-[40px] px-6";
        const isActive = tabActive?.id === tab.id;
        return (
          <Flex className={isActive ? activeClass : normalClass} align="center" key={`pos-tab-order-${idx}`}>
            <Flex className={`rounded-t-lg ${isActive && "mb-4"}`} gap={12}>
              <Text
                type="TITLE4"
                className={!isActive ? "text-white" : ""}
                onClick={() => {
                  const newTabs = cloneDeep(tabs);
                  const tabChange = newTabs.find((t: Tab) => t.id === tab.id);
                  const tabRemoveActive = newTabs.find((t: Tab) => t.isActive);
                  if (tabChange) tabChange.isActive = true;
                  if (tabRemoveActive) tabRemoveActive.isActive = false;
                  setTab(newTabs);
                }}
              >
                {t(`Đơn ${tab.id}`)}
              </Text>
              {tabs.length > 1 && (
                <div className={!isActive ? "fill-white" : ""} onClick={(e) => deleteTab(tab.id)}>
                  <CloseOutlined />
                </div>
              )}
            </Flex>
          </Flex>
        );
      })}

      <Space
        className="cursor-pointer rounded bg-primary50 h-[40px] px-3 fill-white"
        onClick={() => {
          const newTab = cloneDeep(tabs);
          const max = Math.max(...newTab.map((t) => t.id));
          dispatch(
            posActions.setTabs([...newTab, { id: max + 1, isActive: false, lineItems: [], discount: 0, refund: 0 }])
          );
        }}
      >
        <PlusCircleOutlined />
      </Space>
    </Flex>
  );
};

export default React.memo(TabHeader);

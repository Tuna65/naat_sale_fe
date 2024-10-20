import cart from "@/assets/images/cart.png";
import Text from "@/components/Text";
import { tabsSelector } from "@/store/modules/pos/selector";
import { Col, Flex, Image, Row } from "antd";
import { cloneDeep } from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LineItem from "./LineItem";

const PosBoard = () => {
  const { t } = useTranslation();
  const tabs = useSelector(tabsSelector);

  const tabActive = useMemo(() => {
    const newTabs = cloneDeep(tabs);
    const tabActive = newTabs.find((t) => t.isActive);
    return tabActive;
  }, [tabs]);
  return (
    <Flex className="flex-1 py-4 pl-2" vertical gap={12}>
      {tabActive && tabActive?.lineItems?.length > 0 ? (
        <Flex vertical>
          <Row className="w-full px-2 pb-2">
            <Col span={1}></Col>
            <Col span={2}>
              <Text type="HEADLINE">{t("SKU")}</Text>
            </Col>
            <Col span={11}>
              <Text type="HEADLINE">{t("Tên sản phẩm")}</Text>
            </Col>
            <Col span={4}>
              <Text type="HEADLINE" className="text-center">
                {t("Đơn giá")}
              </Text>
            </Col>
            <Col span={2}>
              <Text type="HEADLINE" className="text-center">
                {t("Số lượng")}
              </Text>
            </Col>
            <Col span={4}>
              <Text type="HEADLINE" className="text-right">
                {t("Thành tiền")}
              </Text>
            </Col>
          </Row>

          <LineItem />
        </Flex>
      ) : (
        <Flex justify="center" align="center" className="w-full" flex={1} vertical gap={20}>
          <Image width={120} src={cart} className="mt-36" preview={false} />
          <Text className="text-center inline-block" type="TITLE3">
            {t("Đơn hàng của bạn chưa có sản phẩm nào")}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default React.memo(PosBoard);

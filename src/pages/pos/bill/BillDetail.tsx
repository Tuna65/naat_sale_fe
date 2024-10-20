import InputLine from "@/components/InputLine";
import Text from "@/components/Text";
import { posActions } from "@/store/modules/pos";
import { tabsSelector } from "@/store/modules/pos/selector";
import { func } from "@/utils/func";
import { Col, Flex, Row } from "antd";
import { cloneDeep } from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const BillDetail = () => {
  const { t } = useTranslation();
  const tabs = useSelector(tabsSelector);
  const dispatch = useDispatch();

  const tabActive = useMemo(() => {
    const newTabs = cloneDeep(tabs);
    return newTabs.find((t) => t.isActive);
  }, [tabs]);

  const totalAmount = useMemo(() => {
    if (!tabActive) return 0;
    return tabActive?.lineItems.reduce((acc, item) => {
      const total = item.price * item.quantity;
      return acc + total;
    }, 0);
  }, [tabActive]);

  const updateValue = (key: string, v: number) => {
    const newTabs = cloneDeep(tabs);
    const tabActive = newTabs.find((t) => t.isActive);
    if (!tabActive) return;
    // @ts-ignore
    tabActive[key] = v;
    dispatch(posActions.setTabs(newTabs));
  };

  return (
    <Flex vertical gap={10} className="p-4">
      <Row>
        <Col span={18}>
          <Flex>
            <Text type="TITLE4">{t("Tổng tiền hàng")}</Text>
            <Text type="TITLE3">({tabActive?.lineItems.length})</Text>
          </Flex>
        </Col>
        <Col span={6}>
          <Text type="TITLE4" className="text-right">
            {func.numberWithDots(totalAmount)}
          </Text>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Text type="TITLE4">{t("Giảm giá")}</Text>
        </Col>
        <Col span={6}>
          <InputLine
            value={tabActive?.discount}
            className="font-semibold text-lg text-right"
            onChange={(v) => updateValue("discount", v)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Text type="TITLE4" className="font-semibold">
            {t("Khách cần trả")}
          </Text>
        </Col>
        <Col span={6}>
          <Text type="TITLE2" className="text-right font-semibold text-primary">
            {func.numberWithDots(totalAmount - Number(tabActive?.discount ?? 0))}
          </Text>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Text type="TITLE4" className="font-semibold">
            {t("Khách thanh toán")}
          </Text>
        </Col>
        <Col span={6}>
          <InputLine
            value={tabActive?.refund}
            className=" text-lg text-right"
            onChange={(v) => updateValue("refund", v)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Text type="TITLE4" className="">
            {t("Trả lại")}
          </Text>
        </Col>
        <Col span={6}>
          <Text type="TITLE3" className="text-right font-semibold ">
            {Number(tabActive?.refund ?? 0) !== 0
              ? func.numberWithDots(Number(tabActive?.refund ?? 0) - totalAmount + Number(tabActive?.discount ?? 0))
              : 0}
          </Text>
        </Col>
      </Row>
    </Flex>
  );
};

export default React.memo(BillDetail);

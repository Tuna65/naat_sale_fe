import InputLine from "@/components/InputLine";
import Text from "@/components/Text";
import { tabsSelector } from "@/store/modules/pos/selector";
import { ILineItem } from "@/types/pos";
import { func } from "@/utils/func";
import { CloseOutlined } from "@ant-design/icons";
import { Col, Flex, Image, Popconfirm, Row, Tooltip } from "antd";
import { cloneDeep } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import usePosService from "../usePosService";

const LineItem = () => {
  const { t } = useTranslation();
  const { updateQuantityItem, deleteItem } = usePosService();

  const tabs = useSelector(tabsSelector);

  const tabActive = useMemo(() => {
    const newTabs = cloneDeep(tabs);
    const tabActive = newTabs.find((t) => t.isActive);
    return tabActive;
  }, [tabs]);
  return (
    <Flex className="w-full" vertical gap={6}>
      {tabActive?.lineItems.map((item: ILineItem, idx) => (
        <Row
          key={`lineItem-${idx}`}
          className={`${
            idx % 2 == 0 ? "bg-gray-50" : ""
          } bg-white shadow-box rounded-lg w-full border-0 border-t border-b border-black border-opacity-10 border-solid px-2 py-5`}
        >
          <Col span={1}>
            <Tooltip title={t("Xóa")}>
              <Popconfirm
                title={t("Xóa sản phẩm")}
                description={t("Bạn có chắc chắn xóa sản phẩm này?")}
                okText={t("Xóa")}
                cancelText={t("Hủy")}
                onConfirm={() => deleteItem(item.productId)}
              >
                <CloseOutlined style={{ cursor: "pointer" }} />
              </Popconfirm>
            </Tooltip>
          </Col>
          <Col span={2}>
            <Text>{item.sku}</Text>
          </Col>
          <Col span={11}>
            <Flex gap={10}>
              <Image className="rounded-md" width={32} src={func.avatar(item.name, item.image)} />
              <Text className="text-truncate">{item.name}</Text>
            </Flex>
          </Col>
          <Col span={4}>
            <Text className="text-center">{func.numberWithDots(item.price)}</Text>
          </Col>
          <Col span={2}>
            <InputLine value={item.quantity} onChange={(quantity) => updateQuantityItem({ ...item, quantity })} />
          </Col>
          <Col span={4}>
            <Text type="HEADLINE" className="text-right">
              {func.numberWithDots(item.quantity * item.price)}
            </Text>
          </Col>
        </Row>
      ))}
    </Flex>
  );
};

export default LineItem;

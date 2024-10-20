import Container from "@/components/Container";
import Text from "@/components/Text";
import { ILineItem } from "@/types/pos";
import { func } from "@/utils/func";
import { Flex, Image, Table } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  data?: ILineItem[];
};

const OrderLineItem = (props: Props) => {
  const { t } = useTranslation();
  const { data } = props;
  const columns = () => [
    {
      title: t("Mã đơn hàng"),
      dataIndex: "name",
      align: "left",
      width: 200,
      key: "name",
      render: (name: any, record: ILineItem) => (
        <Flex gap={10}>
          <Image src={func.avatar(record.name, record.image)} width={32} />
          <Flex className="flex-1">
            <Text className="hover:underline hover:cursor-pointer text-truncate" type="BODY">
              {name ?? "---"}
            </Text>
          </Flex>
        </Flex>
      ),
    },
    {
      title: t("Đơn giá"),
      dataIndex: "price",
      align: "right",
      width: 100,
      key: "price",
      render: (price: any, record: ILineItem) => (
        <Text className="" type="BODY">
          {func.numberWithDots(price)}
        </Text>
      ),
    },
    {
      title: t("Số lượng"),
      dataIndex: "quantity",
      align: "center",
      key: "quantity",
      width: 100,
      render: (quantity: any, record: ILineItem) => (
        <Text className="" type="BODY">
          {func.numberWithDots(quantity)}
        </Text>
      ),
    },
    {
      title: t("Thành tiền"),
      dataIndex: "quantity",
      align: "right",
      width: 100,
      key: "quantity",
      render: (quantity: any, record: ILineItem) => {
        const total = record.price * record.quantity;
        return (
          <Text className="font-semibold" type="BODY">
            {func.numberWithDots(total)}
          </Text>
        );
      },
    },
  ];
  return (
    <Container type="SPIN">
      <Flex className="bg-white shadow-box rounded-xl p-4" vertical gap={12}>
        <Text type="TITLE4" className="font-medium">
          {t("Thông tin sản phẩm")}
        </Text>
        <Table dataSource={data} columns={columns() as any} pagination={false} />
      </Flex>
    </Container>
  );
};

export default React.memo(OrderLineItem);

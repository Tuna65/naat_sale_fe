import Text from "@/components/Text";
import { IProduct } from "@/models/product";
import { PATHNAME } from "@/utils/Pathname";
import { func } from "@/utils/func";
import { EditOutlined } from "@ant-design/icons";
import { Button, Flex, Image } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useProductService = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const columns = [
    {
      title: t("Tên sản phẩm"),
      dataIndex: "name",
      key: "name",
      render: (name: any, record: IProduct) => (
        <Flex
          align="center"
          gap={8}
          className="group cursor-pointer"
          onClick={() => navigate(PATHNAME.PRODUCT.DETAIL_ID(record.id ?? ""))}
        >
          <Image
            className="rounded-lg"
            width={40}
            preview={false}
            src={record?.images[0] ? record?.images[0] : func.defaultAvatar(name)}
          />
          <div className="flex-1">
            <Text type="BODY" className="group-hover:underline  text-truncate">
              {name}
            </Text>
          </div>
        </Flex>
      ),
    },
    {
      title: t("SKU"),
      dataIndex: "sku",
      align: "center",
      key: "sku",
      render: (sku: any, _record: IProduct) => (
        <Text type="BODY" className="group-hover:underline ">
          {sku}
        </Text>
      ),
    },
    {
      title: t("Barcode"),
      dataIndex: "barcode",
      align: "center",
      key: "barcode",
      render: (barcode: any, _record: IProduct) => (
        <Text type="BODY" className="group-hover:underline ">
          {barcode}
        </Text>
      ),
    },
    {
      title: t("Nhóm sản phẩm"),
      dataIndex: "group",
      align: "center",
      width: 200,
      key: "group",
      render: (group: any, _record: IProduct) => (
        <Text type="BODY" className="group-hover:underline ">
          {group ?? "---"}
        </Text>
      ),
    },
    {
      title: t("Giá sản phẩm"),
      dataIndex: "price",
      align: "right",
      width: 200,
      key: "price",
      render: (price: any, _record: IProduct) => (
        <Text type="BODY" className="group-hover:underline ">
          {func.numberWithDots(price, "")}
        </Text>
      ),
    },
    {
      title: t("Số lượng"),
      dataIndex: "quantity",
      align: "center",
      width: 200,
      key: "quantity",
      render: (_quantity: any, record: IProduct) => (
        <Text type="BODY" className="group-hover:underline ">
          {func.numberWithDots(record.inventories?.[0].stock, "")}
        </Text>
      ),
    },
    {
      title: t("Thao tác"),
      key: "action",
      width: 200,
      dataIndex: "key",
      align: "center",
      render: (_id: string, record: IProduct) => (
        <Flex className=" items-center justify-center">
          <Button type="text" icon={<EditOutlined />} onClick={() => navigate(PATHNAME.PRODUCT.EDIT_ID(record?.id))} />
        </Flex>
      ),
    },
  ];

  return { columns };
};

export default useProductService;

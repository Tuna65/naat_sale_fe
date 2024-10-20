import { productApi } from "@/apis/product";
import Text from "@/components/Text";
import { SuccessFunc } from "@/models";
import { IProduct } from "@/models/product";
import { keyActions } from "@/store/modules/tanstackKey";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { IBaseLoading } from "@/types";
import { baseLoading } from "@/utils";
import { PATHNAME } from "@/utils/Pathname";
import { func } from "@/utils/func";
import { EditOutlined } from "@ant-design/icons";
import { Button, Flex, Image, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useProductService = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const key = useSelector(keySelector);
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
      render: (sku: any, record: IProduct) => (
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
      render: (barcode: any, record: IProduct) => (
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
      render: (group: any, record: IProduct) => (
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
      render: (price: any, record: IProduct) => (
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
      render: (quantity: any, record: IProduct) => (
        <Text type="BODY" className="group-hover:underline ">
          {func.numberWithDots(quantity, "")}
        </Text>
      ),
    },
    {
      title: t("Thao tác"),
      key: "action",
      width: 200,
      dataIndex: "key",
      align: "center",
      render: (id: string, record: IProduct) => (
        <Flex className=" items-center justify-center">
          <Button type="text" icon={<EditOutlined />} onClick={() => navigate(PATHNAME.PRODUCT.EDIT_ID(record?.id))} />
        </Flex>
      ),
    },
  ];

  const [loading, setLoading] = useState<IBaseLoading>(baseLoading);

  const createProduct = async (body: IProduct) => {
    setLoading((prev) => ({ ...prev, create: true }));
    try {
      const res = await productApi.create(body);
      if (res) {
        message.success("Thêm mới sản phẩm thành công!");
        navigate(-1);
      }
      setLoading((prev) => ({ ...prev, create: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const editProduct = async (id: string, body: IProduct) => {
    console.log(body);
    setLoading((prev) => ({ ...prev, edit: true }));
    try {
      const res = await productApi.edit(body, id);
      if (res) {
        message.success("Chỉnh sửa sản phẩm thành công!");
        navigate(-1);
        dispatch(keyActions.changeKey({ ...key, product: `product_${func.renderCode()}` }));
      }
      setLoading((prev) => ({ ...prev, edit: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, edit: false }));
    }
  };

  const detailProduct = async (id: string, success: SuccessFunc<IProduct>) => {
    setLoading((prev) => ({ ...prev, detail: true }));
    try {
      const res = await productApi.detail(id);
      if (res) {
        success(res);
      }
      setLoading((prev) => ({ ...prev, detail: false }));
    } catch (error) {
      setLoading((prev) => ({ ...prev, detail: false }));
    }
  };
  return { columns, createProduct, editProduct, detailProduct, loading };
};

export default useProductService;

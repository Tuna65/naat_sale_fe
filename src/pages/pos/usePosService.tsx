import { orderApi } from "@/apis/order";
import { IOrder } from "@/models/order";
import { IProduct } from "@/models/product";
import { posActions } from "@/store/modules/pos";
import { tabsSelector } from "@/store/modules/pos/selector";
import { ILineItem, Tab } from "@/types/pos";
import { message } from "antd";
import { cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IBaseLoading } from "@/types";
import { baseLoading } from "@/utils";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { keyActions } from "@/store/modules/tanstackKey";
import { VoidFunc } from "@/models";
import { func } from "@/utils/func";

const usePosService = () => {
  const dispatch = useDispatch();
  const tabs = useSelector(tabsSelector);

  const addItem = (product: IProduct) => {
    if (product.inventories.length == 0) return message.warning("Số lượng sản phẩm trong kho đã hết!");
    const productId = product.id ?? "";
    const newTabs = cloneDeep(tabs);
    const tabActive = newTabs.find((t) => t.isActive);

    if (!tabActive) return;
    const exitedProduct = tabActive.lineItems.find((item) => item.productId == productId);
    if (!exitedProduct)
      tabActive.lineItems = [
        ...tabActive.lineItems,
        { ...product, productId, image: product.images[0], quantity: 1, id: "", stock: product.inventories[0].stock },
      ];
    else {
      if (exitedProduct.quantity == product.inventories[0].stock)
        return message.warning("Số lượng sản phẩm vượt quá số lượng trong kho!");
      exitedProduct.quantity = exitedProduct.quantity + 1;
    }
    setTab(newTabs);
  };

  const updateQuantityItem = (item: ILineItem) => {
    if (item.stock < item.quantity) {
      item.quantity = item.stock;
      message.warning("Số lượng sản phẩm vượt quá số lượng trong kho!");
    }
    const productId = item.productId ?? "";
    const newTabs = cloneDeep(tabs);
    const tabActive = newTabs.find((t) => t.isActive);
    if (!tabActive) return;
    const exitedItem = tabActive.lineItems.find((item) => item.productId == productId);
    if (!exitedItem) return;
    exitedItem.quantity = item.quantity;
    setTab(newTabs);
  };

  const deleteItem = (productId: string) => {
    const newTabs = cloneDeep(tabs);
    const tabActive = newTabs.find((t) => t.isActive);
    if (!tabActive) return;
    tabActive.lineItems = tabActive?.lineItems.filter((item) => item.productId !== productId);
    setTab(newTabs);
  };

  const key = useSelector(keySelector);
  const [loading, setLoading] = useState<IBaseLoading>(baseLoading);
  const createOrder = async (body: IOrder, success: VoidFunc) => {
    setLoading((prev) => ({ ...prev, create: true }));
    try {
      const res = await orderApi.create(body);
      setLoading((prev) => ({ ...prev, create: false }));
      if (res) {
        message.success("Thêm đơn hàng thành công!");
        dispatch(
          keyActions.changeKey({ ...key, order: `order_${func.renderCode()}`, product: `product_${func.renderCode()}` })
        );
        success();
      }
    } catch (error) {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const setTab = (tabs: Tab[]) => {
    dispatch(posActions.setTabs(tabs));
  };

  return { setTab, addItem, updateQuantityItem, deleteItem, createOrder, loading };
};

export default usePosService;

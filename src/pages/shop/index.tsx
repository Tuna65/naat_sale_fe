import React, { useEffect, useState } from "react";
import useShopService from "./useShopService";
import { ResPagination } from "@/models";
import { IShop } from "@/models/shop";
import { defaultResPage } from "@/utils";
import BoxTable from "@/components/BoxTable";
import Text from "@/components/Text";
import { useTranslation } from "react-i18next";

type Props = {};

const Shop = (props: Props) => {
  const { findShop, columns } = useShopService();
  const { t } = useTranslation();

  const [data, setData] = useState<ResPagination<IShop>>(defaultResPage);

  useEffect(() => {
    findShop({ page: 1, limit: 20 }, (data) => setData(data));
  }, []);
  return (
    <div className="flex flex-col gap-10 p-6">
      <Text type="H3">{t('Danh sách cửa hàng')}</Text>
      <div className="">
        <BoxTable data={data} columns={columns as any} />
      </div>
    </div>
  );
};

export default React.memo(Shop);

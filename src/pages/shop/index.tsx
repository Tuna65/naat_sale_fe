import BoxTable from "@/components/BoxTable";
import Text from "@/components/Text";
import { useSearchQuery } from "@/hooks/useQuery";
import { ResPagination } from "@/models";
import { IShop } from "@/models/shop";
import { defaultResPage } from "@/utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useShopService from "./useShopService";

const Shop = () => {
  const { findShop, columns, loading } = useShopService();
  const { params, onParams } = useSearchQuery();
  const { t } = useTranslation();

  const [data, setData] = useState<ResPagination<IShop>>(defaultResPage);

  useEffect(() => {
    if (!params.page) {
      onParams({ page: 1, limit: 20 });
    }
  }, []);

  useEffect(() => {
    const query: any = {
      page: params.page?.toString(),
      limit: params.limit?.toString(),
      name: params.name?.toString(),
    };
    params.page && findShop(query, (data) => setData(data));
  }, []);
  return (
    <div className="flex flex-col gap-10 p-6">
      <Text type="H3">{t("Danh sách cửa hàng")}</Text>
      <div className="">
        <BoxTable data={data} columns={columns as any} isLoading={loading.find} />
      </div>
    </div>
  );
};

export default React.memo(Shop);

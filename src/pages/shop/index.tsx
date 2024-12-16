import { shopApi } from "@/apis/shop";
import BoxTable from "@/components/BoxTable";
import Text from "@/components/Text";
import { useSearchQuery } from "@/hooks/useQuery";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useShopService from "./useShopService";

const Shop = () => {
  const { columns } = useShopService();
  const { params, onParams } = useSearchQuery();
  const { t } = useTranslation();
  const key = useSelector(keySelector);

  useEffect(() => {
    if (!params.page) {
      onParams({ page: 1, limit: 20 });
    }
  }, []);

  const { data, isFetching, isLoading } = useQuery({
    queryKey: [key.shop, params],
    queryFn: shopApi.find,
    staleTime: 600000,
    enabled: !!Object.values(params)?.length,
    retry: 1,
  });

  return (
    <div className="flex flex-col gap-10 p-6">
      <Text type="H3">{t("Danh sách cửa hàng")}</Text>
      <div className="">
        <BoxTable data={data} columns={columns as any} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default React.memo(Shop);

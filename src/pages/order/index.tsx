import ContainerTablePage from "@/components/ContainerTablePage";
import InfinityScroll from "@/components/InfinityScroll";
import { useTitle } from "@/hooks/useTitle";
import { ResPagination } from "@/models";
import { defaultResPage } from "@/utils";
import { Flex } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useOrderService from "./useOrderService";
import { useSelector } from "react-redux";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { useQuery } from "@tanstack/react-query";
import { useSearchQuery } from "@/hooks/useQuery";
import { orderApi } from "@/apis/order";
import { useNavigate } from "react-router-dom";
import { PATHNAME } from "@/utils/Pathname";

const Order = () => {
  const { t } = useTranslation();
  useTitle(t("Đơn hàng"));
  const { params, onParams } = useSearchQuery();
  const key = useSelector(keySelector);
  const { columns } = useOrderService();
  const navigate = useNavigate();

  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: [key.loaction, params],
    queryFn: orderApi.find,
    staleTime: 600000,
    enabled: !!Object.values(params)?.length,
    retry: 1,
  });

  return (
    <Flex vertical gap={24}>
      <ContainerTablePage
        data={data as any}
        column={columns() as any}
        loading={isLoading}
        actionCreate={() => navigate(PATHNAME.SALE)}
      />
    </Flex>
  );
  // return <ContainerTablePage data={data as any} column={[]} loading={true} />;
};

export default React.memo(Order);

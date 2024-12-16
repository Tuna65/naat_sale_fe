import { productApi } from "@/apis/product";
import ContainerTablePage from "@/components/ContainerTablePage";
import { useSearchQuery } from "@/hooks/useQuery";
import { useTitle } from "@/hooks/useTitle";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { PATHNAME } from "@/utils/Pathname";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useProductService from "./useProductService";

const Product = () => {
  const { t } = useTranslation();
  useTitle(t("Sản phẩm"));
  const key = useSelector(keySelector);
  const { params, onParams } = useSearchQuery();
  const { columns } = useProductService();
  const navigate = useNavigate();

  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: [key.product, params],
    queryFn: productApi.query,
    staleTime: 600000,
    enabled: !!Object.values(params)?.length,
    retry: 1,
  });

  return (
    <ContainerTablePage
      actionCreate={() => navigate(PATHNAME.PRODUCT.CREATE)}
      data={data as any}
      column={columns}
      loading={isLoading}
    />
  );
};

export default React.memo(Product);

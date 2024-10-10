import ContainerTablePage from "@/components/ContainerTablePage";
import { useSearchQuery } from "@/hooks/useQuery";
import { useTitle } from "@/hooks/useTitle";
import { ResPagination } from "@/models";
import { IQueryAccount } from "@/types/account";
import { defaultResPage } from "@/utils";
import { PATHNAME } from "@/utils/Pathname";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useUserService from "./useAccountService";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { accountApi } from "@/apis/account";

const Users = () => {
  const { t } = useTranslation();
  useTitle(t("Quản lý nhân viên"));
  const navigate = useNavigate();
  const { params, onParams } = useSearchQuery();
  const { columns, findAccount, loading } = useUserService();

  const [datas, setData] = useState<ResPagination<any>>(defaultResPage);

  // useEffect(() => {
  //   const query: IQueryAccount = {
  //     page: params.page?.toString(),
  //     limit: params.limit?.toString(),
  //     name: params.name?.toString(),
  //   };
  //   params.page && findAccount(query, (v) => setData(v));
  // }, [params]);

  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ["accounts", params],
    queryFn: accountApi.query,
    staleTime: 600000,
    enabled: !!Object.values(params)?.length,
    retry: 1,
  });

  return (
    <ContainerTablePage
      data={data as any}
      column={columns as any}
      loading={isLoading}
      actionCreate={() => navigate(PATHNAME.USER.CREATE)}
    />
  );
};

export default React.memo(Users);

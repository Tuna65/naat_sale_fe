import BoxTable from "@/components/BoxTable";
import SearchBox from "@/components/SearchBox";
import { useTitle } from "@/hooks/useTitle";
import { ResPagination } from "@/models";
import { defaultResPage } from "@/utils";
import { Button, Flex } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useUserService from "./useAccountService";
import { useSearchQuery } from "@/hooks/useQuery";
import { IQueryAccount } from "@/types/account";
import { useNavigate } from "react-router-dom";
import { PATHNAME } from "@/utils/Pathname";
import ContainerTablePage from "@/components/ContainerTablePage";

type Props = {};

const Users = (props: Props) => {
  const { t } = useTranslation();
  useTitle(t("Quản lý nhân viên"));
  const navigate = useNavigate();
  const { params, onParams } = useSearchQuery();
  const { columns, findAccount, loading } = useUserService();

  const [data, setData] = useState<ResPagination<any>>(defaultResPage);

  useEffect(() => {
    const query: IQueryAccount = {
      page: params.page?.toString(),
      limit: params.limit?.toString(),
      name: params.name?.toString(),
    };
    params.page && findAccount(query, (v) => setData(v));
  }, [params]);

  return (
    <ContainerTablePage
      data={data as any}
      column={columns as any}
      loading={loading.find}
      actionCreate={() => navigate(PATHNAME.USER.CREATE)}
    />
  );
};

export default React.memo(Users);

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

type Props = {};

const Users = (props: Props) => {
  const { t } = useTranslation();
  useTitle(t("Quản lý nhân viên"));
  const navigate = useNavigate();
  const { params, onParams } = useSearchQuery();
  const { columns, findAccount, loading } = useUserService();

  const [data, setData] = useState<ResPagination<any>>(defaultResPage);

  useEffect(() => {
    if (!params.page) onParams({ page: 1, limit: 20 });
  }, []);

  useEffect(() => {
    const query: IQueryAccount = {
      page: params.page?.toString(),
      limit: params.limit?.toString(),
      name: params.name?.toString(),
    };
    params.page && findAccount(query, (v) => setData(v));
  }, [params]);

  return (
    <Flex vertical gap={20} className=" rounded-lg">
      <Flex className="" justify="space-between">
        <SearchBox onChange={(name) => onParams({ ...params, name })} value="" className="" />
        <Button type="primary" size="large" onClick={() => navigate(PATHNAME.USER.CREATE)}>
          {t("Thêm mới")}
        </Button>
      </Flex>

      <BoxTable isLoading={loading.find} columns={columns as any} data={data} />
    </Flex>
  );
};

export default React.memo(Users);

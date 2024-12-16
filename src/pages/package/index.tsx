import BoxTable from "@/components/BoxTable";
import SearchBox from "@/components/SearchBox";
import { useSearchQuery } from "@/hooks/useQuery";
import { useTitle } from "@/hooks/useTitle";
import { ResPagination } from "@/models";
import { IPackage } from "@/models/package";
import { defaultResPage } from "@/utils";
import { PATHNAME } from "@/utils/Pathname";
import { Button, Flex } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import usePackageService from "./usePackageService";
import useAsync from "@/hooks/useApi";
import { packageApi } from "@/apis/package";

const Package = () => {
  const { t } = useTranslation();
  const { params, onParams } = useSearchQuery();
  useTitle(t("Bảng giá gói"));
  const navigate = useNavigate();
  const { columns } = usePackageService();

  const [data, setData] = useState<ResPagination<IPackage>>(defaultResPage);

  const { execute: findPackage, loading } = useAsync(packageApi.find, {
    onSucess: (response: any) => {
      setData(response.data);
    },
    onFailed: (_error) => {},
  });

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
    params.page && findPackage(query);
  }, [params]);

  return (
    <Flex vertical className="p-6" gap={24}>
      <Flex justify="space-between" align="center">
        <SearchBox placeholder={t("Tìm kiếm theo tên")} onChange={(name) => onParams({ ...params, name })} value="" />
        <Button type="primary" onClick={() => navigate(PATHNAME.PACKAGE.CREATE)}>
          {t("Thêm mới")}
        </Button>
      </Flex>
      <BoxTable data={data} columns={columns as any} isLoading={loading} />
    </Flex>
  );
};

export default React.memo(Package);

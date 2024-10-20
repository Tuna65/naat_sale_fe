import { roleApi } from "@/apis/role";
import ContainerTablePage from "@/components/ContainerTablePage";
import { useSearchQuery } from "@/hooks/useQuery";
import { useTitle } from "@/hooks/useTitle";
import { PATHNAME } from "@/utils/Pathname";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useRoleService from "./useRoleService";
import { useSelector } from "react-redux";
import { keySelector } from "@/store/modules/tanstackKey/selector";

const Role = () => {
  const { t } = useTranslation();
  useTitle(t("Vai trò"));
  const { params } = useSearchQuery();
  const { loading, columns } = useRoleService();
  const navigate = useNavigate();
  const key = useSelector(keySelector);

  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: [key.role, params],
    queryFn: roleApi.find,
    staleTime: 600000,
    enabled: !!Object.values(params)?.length,
    retry: 1,
  });

  return (
    <ContainerTablePage
      data={data as any}
      column={columns()}
      loading={loading.find}
      actionCreate={() => navigate(PATHNAME.ROLE.CREATE)}
    />
  );
};

export default React.memo(Role);

import ContainerTablePage from "@/components/ContainerTablePage";
import { useSearchQuery } from "@/hooks/useQuery";
import { useTitle } from "@/hooks/useTitle";
import { ResPagination } from "@/models";
import { IRole } from "@/models/role";
import React, { useEffect, useState } from "react";
import useRoleService from "./useRoleService";
import { defaultResPage } from "@/utils";

const Role = () => {
  useTitle("Vai trò");
  const { params, onParams } = useSearchQuery();
  const { loading, columns, findRole } = useRoleService();

  const [data, setData] = useState<ResPagination<IRole>>(defaultResPage);

  useEffect(() => {
    const query: any = {
      page: params.page?.toString(),
      limit: params.limit?.toString(),
      name: params.name?.toString(),
    };
    params.page && findRole(query, (v) => setData(v));
  }, [params]);
  
  return <ContainerTablePage data={data as any} column={columns()} loading={loading.find} />;
};

export default React.memo(Role);

import BoxTable from "@/components/BoxTable";
import SearchBox from "@/components/SearchBox";
import { useTitle } from "@/hooks/useTitle";
import { ResPagination } from "@/models";
import { defaultResPage } from "@/utils";
import { Button, Flex } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useUserService from "./useUserService";

type Props = {};

const Users = (props: Props) => {
  const { t } = useTranslation();
  useTitle(t("Users"));
  const { columns } = useUserService();

  const [data, setData] = useState<ResPagination<any>>(defaultResPage);

  return (
    <Flex vertical gap={32} className="p-6 bg-white rounded-lg">
      <Flex className="" justify="space-between">
        <SearchBox onChange={(v) => {}} value="" />
        <Button type="primary" size="large">
          {t("Create User")}
        </Button>
      </Flex>

      <BoxTable columns={columns as any} data={data} />
    </Flex>
  );
};

export default React.memo(Users);

import BoxTable from "@/components/BoxTable";
import SearchBox from "@/components/SearchBox";
import { ResPagination } from "@/models";
import { ILocation } from "@/models/location";
import { defaultResPage } from "@/utils";
import { Button, Flex } from "antd";
import React, { useEffect, useState } from "react";
import useLocationService from "./useLocationService";
import { useSearchQuery } from "@/hooks/useQuery";
import { useTranslation } from "react-i18next";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { PATHNAME } from "@/utils/Pathname";
import { useBoolean } from "@/hooks/useBoolean";
import CModalCreatLocation from "./components/CModalCreatLocation";
import CModalEditLocation from "./components/CModalEditLocation";

const Location = () => {
  const { t } = useTranslation();
  useTitle(t("Chi nhánh"));
  const { findLocation, loading, columns } = useLocationService();
  const [openModal, { on, off }] = useBoolean();
  const [openModalEdit, { on: onEdit, off: offEdit }] = useBoolean();
  const navigate = useNavigate();
  const { params, onParams } = useSearchQuery();
  const [data, setData] = useState<ResPagination<ILocation>>(defaultResPage);
  const [location, setLocation] = useState<ILocation>();

  useEffect(() => {
    if (!params.page) onParams({ page: 1, limit: 20 });
  }, []);

  useEffect(() => {
    const query: any = {
      page: params.page?.toString(),
      limit: params.limit?.toString(),
      name: params.name?.toString(),
    };
    params.page && findLocation(query, (v) => setData(v));
  }, [params]);
  return (
    <Flex vertical gap={24}>
      <Flex justify="space-between" align="center">
        <SearchBox onChange={() => {}} value="" />
        <Button type="primary" onClick={on}>
          {t("Thêm mới")}
        </Button>
      </Flex>

      <BoxTable
        data={data}
        columns={
          columns((record) => {
            onEdit();
            setLocation(record);
          }) as any
        }
        isLoading={loading.find}
      />
      <CModalCreatLocation off={off} open={openModal} />
      <CModalEditLocation off={offEdit} open={openModalEdit} location={location as ILocation} />
    </Flex>
  );
};

export default React.memo(Location);

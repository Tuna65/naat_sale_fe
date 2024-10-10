import ContainerTablePage from "@/components/ContainerTablePage";
import { useBoolean } from "@/hooks/useBoolean";
import { useSearchQuery } from "@/hooks/useQuery";
import { useTitle } from "@/hooks/useTitle";
import { ResPagination } from "@/models";
import { ILocation } from "@/models/location";
import { defaultResPage } from "@/utils";
import { Flex } from "antd";
import { cloneDeep } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CModalCreatLocation from "./components/CModalCreatLocation";
import CModalEditLocation from "./components/CModalEditLocation";
import useLocationService from "./useLocationService";

const Location = () => {
  const { t } = useTranslation();
  useTitle(t("Chi nhánh"));
  const { findLocation, loading, columns } = useLocationService();
  const [openModal, { on, off }] = useBoolean();
  const [openModalEdit, { on: onEdit, off: offEdit }] = useBoolean();
  const { params, onParams } = useSearchQuery();
  const [data, setData] = useState<ResPagination<ILocation>>(defaultResPage);
  const [location, setLocation] = useState<ILocation>();

  useEffect(() => {
    const query: any = {
      page: params.page?.toString(),
      limit: params.limit?.toString(),
      name: params.name?.toString(),
    };
    params.page && findLocation(query, (v) => setData(v));
  }, [params]);

  const onUpdateData = useCallback(
    (location: ILocation) => {
      const dataClone = cloneDeep(data);
      const index = dataClone.items.findIndex((i) => i.id === location.id);
      dataClone.items[index] = location;
      setData(dataClone);
    },
    [data]
  );
  
  return (
    <Flex vertical gap={24}>
      <ContainerTablePage
        data={data as any}
        column={
          columns((record) => {
            onEdit();
            setLocation(record);
          }) as any
        }
        loading={loading.find}
        actionCreate={on}
      />
      
      <CModalCreatLocation off={off} open={openModal} onSuccessUpdate={onUpdateData} />
      <CModalEditLocation
        onSuccessUpdate={onUpdateData}
        off={offEdit}
        open={openModalEdit}
        location={location as ILocation}
      />
    </Flex>
  );
};

export default React.memo(Location);

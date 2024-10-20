import { locationApi } from "@/apis/location";
import ContainerTablePage from "@/components/ContainerTablePage";
import { useBoolean } from "@/hooks/useBoolean";
import { useSearchQuery } from "@/hooks/useQuery";
import { useTitle } from "@/hooks/useTitle";
import { ResPagination } from "@/models";
import { ILocation } from "@/models/location";
import { keyActions } from "@/store/modules/tanstackKey";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { defaultResPage } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Flex } from "antd";
import { cloneDeep } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CModalCreatLocation from "./components/CModalCreatLocation";
import CModalEditLocation from "./components/CModalEditLocation";
import useLocationService from "./useLocationService";
import { func } from "@/utils/func";

const Location = () => {
  const { t } = useTranslation();
  useTitle(t("Chi nhánh"));
  const { columns } = useLocationService();
  const [openModal, { on, off }] = useBoolean();
  const [openModalEdit, { on: onEdit, off: offEdit }] = useBoolean();
  const { params, onParams } = useSearchQuery();
  const [items, setItems] = useState<ResPagination<ILocation>>(defaultResPage);
  const [location, setLocation] = useState<ILocation>();
  const key = useSelector(keySelector);
  const dispatch = useDispatch();

  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: [key.loaction, params],
    queryFn: locationApi.query,
    staleTime: 600000,
    enabled: !!Object.values(params)?.length,
    retry: 1,
  });

  const onUpdateData = useCallback(
    (location: ILocation) => {
      const dataClone = cloneDeep(items);
      const index = dataClone.items.findIndex((i) => i.id === location.id);
      dataClone.items[index] = location;
      setItems(dataClone);
      dispatch(keyActions.changeKey({ ...key, loaction: `locations_${func.renderCode()}` }));
    },
    [items]
  );

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

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
        loading={isLoading}
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

import { locationApi } from "@/apis/location";
import { IconHomeFill, IconLocationFill, IconUserFill } from "@/assets/Icon";
import Text from "@/components/Text";
import { STORAGE } from "@/configs/storage";
import { EStatus } from "@/enum/EStatus";
import { useBoolean } from "@/hooks/useBoolean";
import { ILocation } from "@/models/location";
import { localStorageUtil } from "@/service/storage";
import { userSelector } from "@/store/modules/auth/selector";
import { locationSelector } from "@/store/modules/pos/selector";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { PATHNAME } from "@/utils/Pathname";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Tooltip } from "antd";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalLocation from "./ModalLocation";
import { posActions } from "@/store/modules/pos";

const Action = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const key = useSelector(keySelector);
  const location = useSelector(locationSelector);
  const [open, { on, off }] = useBoolean();
  const dispatch = useDispatch();

  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: [key.loaction, { page: 1, limit: 20, status: EStatus.ACTIVE }],
    queryFn: locationApi.query,
    staleTime: 600000,
    enabled: !!Object.values({ page: 1, limit: 20, status: EStatus.ACTIVE })?.length,
    retry: 1,
  });

  const locations = useMemo(() => {
    return data?.items?.filter((i: ILocation) => i.status === EStatus.ACTIVE);
  }, [data]);

  const locationId = localStorageUtil.get(STORAGE.LOCATION_ID);

  useEffect(() => {
    if (!locationId && !location) on();

    if (!data) return;
    if (locationId && !location) {
      const crrLocation = data.items.find((i: ILocation) => i.id == locationId);
      dispatch(posActions.setLocation(crrLocation));
    }
  }, [location, data]);
  return (
    <Flex justify="space-between" align="center" className="px-2">
      <Flex vertical gap={8}>
        <Flex gap={4} align="center">
          <IconUserFill />
          <Text type="CAPTION2" className="text-white">
            {user?.name}
          </Text>
        </Flex>
        <Tooltip title={t("Chọn chi nhánh")}>
          <Flex gap={4} align="center" onClick={on} className="cursor-pointer group">
            <IconLocationFill style={{ width: "16px" }} />
            <Text type="CAPTION2" className="text-white group-hover:underline">
              {location && location.name}
            </Text>
          </Flex>
        </Tooltip>
      </Flex>
      <Flex className="fill-white">
        <Tooltip title={t("Trang chủ")}>
          <Button type="text" onClick={() => navigate(PATHNAME.DASHBOARD)}>
            <IconHomeFill />
          </Button>
        </Tooltip>
      </Flex>
      <ModalLocation off={off} open={open} locations={locations} />
    </Flex>
  );
};

export default React.memo(Action);

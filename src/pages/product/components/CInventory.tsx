import { locationApi } from "@/apis/location";
import NumbericInput from "@/components/NumbericInput";
import Text from "@/components/Text";
import { EStatus } from "@/enum/EStatus";
import { IInventory } from "@/models/inventory";
import { ILocation } from "@/models/location";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { useQuery } from "@tanstack/react-query";
import { Col, Flex, Row } from "antd";
import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  value?: IInventory[];
  onChange?: (value: IInventory[]) => void;
  disabled?: boolean;
};

const CInventory = (props: Props) => {
  const { value, onChange, disabled } = props;
  const key = useSelector(keySelector);
  const [inventories, setInventories] = useState<IInventory[]>([]);

  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: [key.product, { page: 1, limit: 20, status: EStatus.ACTIVE }],
    queryFn: locationApi.query,
    staleTime: 600000,
    enabled: !!Object.values({ page: 1, limit: 20, status: EStatus.ACTIVE })?.length,
    retry: 1,
  });

  const onChangeInventory = (locationId: string, key: string, value: any) => {
    const newData = cloneDeep(inventories);
    const inven = newData.find((i) => i.locationId == locationId);
    if (inven) {
      // @ts-ignore
      inven[key] = value;
    }
    setInventories(newData);
    onChange && onChange(newData);
  };

  useEffect(() => {
    if (data) {
      const listInventory = data?.items?.map((i: ILocation, _idx: number) => {
        const data = value?.find((v) => v.locationId);
        const invent: IInventory = {
          locationId: i.id as string,
          mac: data?.mac ?? 0,
          stock: data?.stock ?? 0,
          locationName: i.name,
        };
        return invent;
      });
      setInventories(listInventory);
    }
  }, [data, value]);

  return (
    <div className="">
      <Row gutter={[24, 24]}>
        {inventories?.map((i: IInventory, idx: number) => (
          <Col span={6} key={`inventory-${idx}`}>
            <Flex
              className="border border-solid border-black border-opacity-20 px-2 py-4 rounded-lg"
              align="center"
              justify="center"
              gap={12}
              vertical
            >
              <Text type="TITLE3">{i.locationName}</Text>
              <Flex gap={12}>
                {/* <Flex vertical gap={10}> */}
                  <Text className="mb-2" type="BODY">{`Giá vốn:`}</Text>
                  <NumbericInput
                    onChange={(v) => onChangeInventory(i.locationId, "mac", v)}
                    className="text-center"
                    value={i.mac}
                    disabled={disabled}
                  />
                {/* </Flex> */}
                {/* <Flex vertical gap={10}> */}
                  <Text className="mb-2" type="BODY">{`Tồn kho:`}</Text>
                  <NumbericInput
                    className="text-center"
                    value={i.stock}
                    onChange={(v) => onChangeInventory(i.locationId, "stock", v)}
                    disabled={disabled}
                  />
                {/* </Flex> */}
              </Flex>
            </Flex>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default React.memo(CInventory);

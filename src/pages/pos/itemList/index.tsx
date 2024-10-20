import { productApi } from "@/apis/product";
import Text from "@/components/Text";
import { ResPagination } from "@/models";
import { IProduct } from "@/models/product";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { func } from "@/utils/func";
import { useQuery } from "@tanstack/react-query";
import { Col, Flex, Image, Row, Tooltip } from "antd";
import { cloneDeep } from "lodash";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import usePosService from "../usePosService";
import { locationSelector } from "@/store/modules/pos/selector";

const ItemList = () => {
  const key = useSelector(keySelector);
  const { addItem } = usePosService();
  const location = useSelector(locationSelector);

  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: [key.product, { page: 1, limit: 12, locationId: location?.id }],
    queryFn: productApi.query,
    staleTime: 600000,
    enabled: !!location?.id,
    retry: 1,
  });

  const products = useMemo(() => {
    const newData: ResPagination<IProduct> = cloneDeep(data);
    return newData?.items ?? [];
  }, [data]);
  return (
    <Flex className="ml-2 mb-2 h-[150px] bg-white shadow-box rounded-lg" vertical>
      <Row className="p-2 w-full  " gutter={[8, 8]}>
        {products.map((p, idx) => (
          <Col key={`product-list-${idx}`} className="cursor-pointer" span={4} onClick={() => addItem(p)}>
            <Flex gap={6} align="center" className="p-1 border border-solid border-black border-opacity-10 rounded-md">
              <Image preview={false} width={48} className="rounded-md" src={func.avatar(p.name, p?.images[0])} />
              <Tooltip title={p.name}>
                <Flex vertical flex={1}>
                  <Text type="CAPTION1" className="text-truncate-oneline">
                    {p.name}
                  </Text>
                  <Flex justify="space-between">
                    <Text type="HEADLINE" className="text-primary">
                      {func.numberWithDots(p?.inventories[0]?.mac)}
                      {/* {func.numberWithDots(p.price)} */}
                    </Text>
                    <Text type="HEADLINE" className="text-right text-gray-700">
                      {func.numberWithDots(p?.inventories[0]?.stock)}
                    </Text>
                  </Flex>
                </Flex>
              </Tooltip>
            </Flex>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default React.memo(ItemList);

import { productApi } from "@/apis/product";
import SearchBox from "@/components/SearchBox";
import Text from "@/components/Text";
import { IProduct } from "@/models/product";
import { locationSelector, tabsSelector } from "@/store/modules/pos/selector";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { func } from "@/utils/func";
import { useQuery } from "@tanstack/react-query";
import { Flex, Image, Popover, Tooltip } from "antd";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import usePosService from "../usePosService";

const SearchHeader = () => {
  const { t } = useTranslation();
  const { addItem } = usePosService();
  const key = useSelector(keySelector);
  const tabs = useSelector(tabsSelector);
  const location = useSelector(locationSelector);

  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: [key.product, { page: 1, limit: 12, locationId: location?.id }],
    queryFn: productApi.query,
    staleTime: 600000,
    enabled: !!location?.id,
    retry: 1,
  });

  const content = useMemo(() => {
    if (data)
      return (
        <Flex vertical className="w-[500px]">
          {data?.items?.map((i: IProduct, idx: number) => (
            <Flex
              key={`${idx}-product-search`}
              gap={10}
              align="center"
              className="cursor-pointer hover:bg-gray-100 p-2"
              onClick={() => addItem(i)}
            >
              <Image src={func.avatar(i.name, i.images[0])} width={32} />
              <Tooltip title={i.name} placement="right">
                <Flex vertical flex={1}>
                  <Text type="HEADLINE" className="text-truncate-oneline">
                    {i.name}
                  </Text>
                  <Text>{func.numberWithDots(i.price)}</Text>
                </Flex>
              </Tooltip>
            </Flex>
          ))}
        </Flex>
      );
  }, [data, tabs]);

  return (
    <Popover content={content} placement="bottomLeft" arrow={false}>
      <div className="w-72">
        <SearchBox value="" onChange={(v) => {}} placeholder={t("Tìm kiếm sản phẩm...")} className="w-full" />
      </div>
    </Popover>
  );
};

export default React.memo(SearchHeader);

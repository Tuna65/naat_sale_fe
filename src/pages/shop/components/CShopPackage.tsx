import Text from "@/components/Text";
import { EPackage } from "@/enum/EPackage";
import { ResPagination } from "@/models";
import { IPackage } from "@/models/package";
import usePackageService from "@/pages/package/usePackageService";
import { defaultResPage } from "@/utils";
import { Flex, Popover } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CaretDownOutlined } from "@ant-design/icons";
import { IShop } from "@/models/shop";
import useShopService from "../useShopService";

interface ICShopPackageProps {
  shop: IShop;
}

const CShopPackage = (props: ICShopPackageProps) => {
  const { shop } = props;
  const { t } = useTranslation();
  const { findPackage } = usePackageService();
  const { editShop, loading } = useShopService();

  const [data, setData] = useState<ResPagination<IPackage>>(defaultResPage);
  const [value, setValue] = useState<string>(shop?.packageId ?? "");

  const getPackage = (key: EPackage) => {
    return data.items.find((i) => i.key == key);
  };

  const statusStyle = useMemo(() => {
    const packages = data.items.find((i) => i.id == value);
    if (!packages)
      return {
        text: t("Hết hạn"),
        border: "bg-red-100",
        textColor: "text-red-500",
      };
    switch (packages?.key) {
      case EPackage.BASIC: {
        return {
          text: getPackage(EPackage.BASIC)?.name,
          border: "bg-green-100",
          textColor: "text-green-500",
        };
      }
      case EPackage.ADVANCE: {
        return {
          text: getPackage(EPackage.ADVANCE)?.name,
          border: "bg-primary15",
          textColor: "text-primary",
        };
      }

      case EPackage.NORMAL: {
        return {
          text: getPackage(EPackage.NORMAL)?.name,
          border: "bg-gray-100",
          textColor: "text-gray-500",
        };
      }

      case EPackage.PRO: {
        return {
          text: getPackage(EPackage.PRO)?.name,
          border: "bg-yellow-100",
          textColor: "text-yellow-500",
        };
      }
    }
  }, [data, value]);

  useEffect(() => {
    findPackage({ page: 1, limit: 20 }, (v) => setData(v));
  }, []);

  const handleChangePackage = async (packageId: string) => {
    editShop(shop?.id ?? "", { ...shop, packageId });
    setValue(packageId);
  };
  return (
    // <Popover
    //   placement="bottom"
    //   className="cursor-pointer"
    //   content={
    //     <Flex vertical>
    //       {data.items.map((i, idx) => {
    //         return (
    //           <Text
    //             type="BODY"
    //             key={`shop-status-${idx}`}
    //             className="py-1 cursor-pointer hover:underline hover:text-primary"
    //             onClick={() => handleChangePackage(i?.id as string)}
    //           >
    //             {i.name}
    //           </Text>
    //         );
    //       })}
    //     </Flex>
    //   }
    // >
    <Flex justify="center" className={`px-3 py-2 rounded-lg inline-flex ${statusStyle?.border}`} align="center" gap={8}>
      <Text className={`${statusStyle?.textColor}`} type="CAPTION2">
        {statusStyle?.text}
      </Text>
      {/* <CaretDownOutlined /> */}
    </Flex>
    // </Popover>
  );
};

export default React.memo(CShopPackage);

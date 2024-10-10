import ContainerTablePage from "@/components/ContainerTablePage";
import { useTitle } from "@/hooks/useTitle";
import { ResPagination } from "@/models";
import { defaultResPage } from "@/utils";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const ProductGroup = (props: Props) => {
  const { t } = useTranslation();
  useTitle(t("Nhóm sản phẩm"));
  
  const [data, setData] = useState<ResPagination<any>>(defaultResPage);

  return <ContainerTablePage data={data as any} column={[]} loading={true} />;
};

export default React.memo(ProductGroup);

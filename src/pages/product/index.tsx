import { useTitle } from "@/hooks/useTitle";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const Product = (props: Props) => {
  const { t } = useTranslation();
  useTitle(t("Product"));
  return <div>Product</div>;
};

export default React.memo(Product);

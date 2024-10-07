import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import Text from "./Text";
import { useNavigate } from "react-router-dom";

interface IPageContainerProps {
  loading?: boolean;
  children: React.ReactNode;
  actions?: React.ReactNode;
  hiddenBack?: boolean;
}

const PageContainer = (props: IPageContainerProps) => {
  const { children, actions, loading, hiddenBack } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Flex vertical gap={24} className="mb-8">
      {!hiddenBack && (
        <Flex className="" justify="space-between" align="center">
          <Flex gap={12} className="group cursor-pointer" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined />
            <Text type="CAPTION1" className="group-hover:underline">
              {t("Quay lại")}
            </Text>
          </Flex>

          <div className="">{actions}</div>
        </Flex>
      )}

      <div className="">{children}</div>
    </Flex>
  );
};

export default React.memo(PageContainer);

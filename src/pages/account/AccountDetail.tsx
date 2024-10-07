import Container from "@/components/Container";
import PageContainer from "@/components/PageContainer";
import { IUser } from "@/models/user";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CDetailInfo from "./components/CDetailInfo";
import useAccountService from "./useAccountService";
import COrderAccount from "./components/COrderAccount";
import { Flex } from "antd";

type Props = {};

const AccountDetail = (props: Props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { editAccount, loading, detailAccount } = useAccountService();

  const [detailData, setDetailData] = useState<IUser>();

  useEffect(() => {
    id && detailAccount(id, (data) => setDetailData(data));
  }, []);

  return (
    <PageContainer>
      <Flex vertical gap={24}>
        <Container isLoading={loading.detail} type="SPIN">
          <CDetailInfo detailData={detailData as IUser} />
        </Container>
        <COrderAccount />
      </Flex>
    </PageContainer>
  );
};

export default React.memo(AccountDetail);

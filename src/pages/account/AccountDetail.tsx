import { accountApi } from "@/apis/account";
import Container from "@/components/Container";
import PageContainer from "@/components/PageContainer";
import useAsync from "@/hooks/useApi";
import { IUser } from "@/models/user";
import { Flex } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CDetailInfo from "./components/CDetailInfo";
import COrderAccount from "./components/COrderAccount";

const AccountDetail = () => {
  const { id } = useParams();

  const { execute: detailAccount, loading: loadingDetail } = useAsync(accountApi.detail, {
    onSucess: (response: any) => {
      setDetailData(response.data);
    },
    onFailed: (_error) => {},
  });

  const [detailData, setDetailData] = useState<IUser>();

  useEffect(() => {
    id && detailAccount(id);
  }, []);

  return (
    <PageContainer>
      <Flex vertical gap={24}>
        <Container isLoading={loadingDetail} type="SPIN">
          <CDetailInfo detailData={detailData as IUser} />
        </Container>
        <COrderAccount />
      </Flex>
    </PageContainer>
  );
};

export default React.memo(AccountDetail);

import PageContainer from "@/components/PageContainer";
import Text from "@/components/Text";
import UploadFile from "@/components/UploadFile";
import { EStatus } from "@/enum/EStatus";
import { useTitle } from "@/hooks/useTitle";
import { IUser } from "@/models/user";
import useGlobalService from "@/utils/useGlobalService";
import { Button, Col, Flex, Form, Row, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import CFormAddress from "./components/CFormAddress";
import CFormInfo from "./components/CFormInfo";
import useAccountService from "./useAccountService";
import InfinityScroll from "@/components/InfinityScroll";
import { roleApi } from "@/apis/role";
import { keySelector } from "@/store/modules/tanstackKey/selector";
import { useSelector } from "react-redux";

const EditAccount = () => {
  const { t } = useTranslation();
  useTitle(t("Chỉnh sửa nhân viên"));
  const { editAccount, loading, detailAccount } = useAccountService();
  const { rulesForm } = useGlobalService();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const key = useSelector(keySelector);

  const [detailData, setDetailData] = useState<IUser>();

  useEffect(() => {
    id && detailAccount(id, (data) => setDetailData(data));
  }, []);

  const onFinish = (v: IUser) => {
    v.status = true ? EStatus.ACTIVE : EStatus.INACTIVE;
    editAccount(id ?? "", v);
  };

  return (
    <PageContainer
      actions={
        <Flex align="center" gap={10}>
          <Button type="default" onClick={() => navigate(-1)}>
            {t("Hủy")}
          </Button>
          <Button loading={loading.edit} type="primary" onClick={() => form.submit()}>
            {t("Lưu")}
          </Button>
        </Flex>
      }
    >
      {detailData && (
        <Form layout="vertical" form={form} onFinish={onFinish} initialValues={detailData}>
          <Row className="bg-white shadow-box py-6 rounded-md" gutter={12}>
            <Col span={4}>
              <UploadFile onChange={() => {}} />
            </Col>
            <Col span={20}>
              <Flex vertical gap={6}>
                <CFormInfo />

                <Flex vertical gap={8}>
                  <Text type="TITLE3">{t("Vai trò")}</Text>
                  <Row gutter={[12, 0]}>
                    <Col span={8}>
                      <Form.Item label={t("Vai trò")} name="roleId">
                        <InfinityScroll placeholder={t("Chọn vai trò")} keyValue={key.role} apiFunc={roleApi.find} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Flex>

                <CFormAddress />
                <Flex align="center" gap={12}>
                  <Form.Item label="Trạng thái" name="status">
                    <Switch />
                  </Form.Item>
                </Flex>
              </Flex>
            </Col>
          </Row>
        </Form>
      )}
    </PageContainer>
  );
};

export default React.memo(EditAccount);

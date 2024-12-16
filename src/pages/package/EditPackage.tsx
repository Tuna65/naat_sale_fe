import { packageApi } from "@/apis/package";
import NumbericInput from "@/components/NumbericInput";
import Text from "@/components/Text";
import useAsync from "@/hooks/useApi";
import { IPackage } from "@/models/package";
import { OptionPackage } from "@/utils/option";
import useGlobalService from "@/utils/useGlobalService";
import { Button, Col, Flex, Form, Input, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const EditPackage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { rulesForm } = useGlobalService();
  const { id } = useParams();
  const navigate = useNavigate();

  const [detailData, setDetailData] = useState<IPackage>();

  const { execute: editPackage, loading } = useAsync(packageApi.edit, {
    onSucess: (_response: any) => {
      message.success("Sửa gói thành công!");
      navigate(-1);
    },
    onFailed: (_error) => {},
  });

  const { execute: detailPackage, loading: _loadingDetail } = useAsync(packageApi.detail, {
    onSucess: (response: any) => {
      setDetailData(response.data);
    },
    onFailed: (_error) => {},
  });

  useEffect(() => {
    id && detailPackage(id);
  }, []);

  const onFinish = (v: any) => editPackage(v, id ?? "");
  return (
    <Flex className="w-[500px] p-6 m-auto mt-12 bg-white shadow-box" vertical gap={24}>
      <Text type="TITLE2" className="text-center">
        {t("Sửa gói")}
      </Text>
      {detailData && (
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={detailData}>
          <Form.Item label={t("Tên gói")} name="name" rules={rulesForm.name}>
            <Input placeholder={t("Nhập tên gói")} disabled />
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label={t("Key")} name="key" rules={rulesForm.keyPackage}>
                <Select options={OptionPackage} placeholder={t("Nhập key gói")} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("Giá tiền")} name="price" rules={rulesForm.pricePackage}>
                <NumbericInput placeholder={t("Nhập giá")} size="middle" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("Số tài khoản")} name="totalUser" rules={rulesForm.totalUserPackage}>
                <NumbericInput placeholder={t("Nhập số lượng")} size="middle" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("Số chi nhánh")} name="totalLocation" rules={rulesForm.totalLocationPackage}>
                <NumbericInput placeholder={t("Nhập số lượng")} size="middle" className="w-full" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}

      <Button onClick={() => form.submit()} loading={loading} type="primary">
        {t("Lưu")}
      </Button>
    </Flex>
  );
};

export default React.memo(EditPackage);

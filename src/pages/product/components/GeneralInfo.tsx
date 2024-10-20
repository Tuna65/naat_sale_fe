import Editor from "@/components/Editor";
import NumbericInput from "@/components/NumbericInput";
import useGlobalService from "@/utils/useGlobalService";
import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  disabled?: boolean;
};

const GeneralInfo = (props: Props) => {
  const { disabled } = props;
  const { t } = useTranslation();
  const { rulesForm } = useGlobalService();
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item label={t("Tên sản phẩm")} name="name" rules={rulesForm.name}>
          <Input disabled={disabled} placeholder={t("Nhập tên sản phẩm")} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label={t("Giá sản phẩm")} name="price" rules={rulesForm.price}>
          <NumbericInput disabled={disabled} size="middle" placeholder={t("Nhập giá sản phẩm")} className="w-full" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label={t("Mã barcode")} name="barcode">
          <Input disabled={disabled} placeholder={t("Nhập barcode sản phẩm")} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label={t("Danh mục")}>
          <Select disabled={disabled} placeholder={t("Chọn danh mục sản phẩm")} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label={t("Đơn vị")} name="unit" rules={rulesForm.unit}>
          <Input disabled={disabled} placeholder={t("Nhập đơn vị sản phẩm")} />
        </Form.Item>
      </Col>
      {/* <Col span={12}>
        <Form.Item label={t("Số lượng")} name="quantity" rules={rulesForm.quantity}>
          <NumbericInput
            disabled={disabled}
            size="middle"
            placeholder={t("Nhập số lượng sản phẩm")}
            className="w-full"
          />
        </Form.Item>
      </Col> */}
      <Col span={24}>
        <Form.Item label={t("Mô tả")} name="description">
          <Editor disabled={disabled} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default React.memo(GeneralInfo);

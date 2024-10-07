import { VoidFunc } from "@/models";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import useShopService from "../useShopService";
import { IShop } from "@/models/shop";
import useGlobalService from "@/utils/useGlobalService";
import { useTranslation } from "react-i18next";
import { OptionPackage, TimeOption } from "@/utils/option";
import { renderExpiredDate } from "@/enum/ETime";
import { BodyUpPackage } from "@/types/shop";

type Props = {
  open?: boolean;
  off: VoidFunc;
  detailData: IShop;
};

const CModalUpPackage = (props: Props) => {
  const { off, open, detailData } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { upPackage, loading } = useShopService();
  const { rulesForm } = useGlobalService();
  const onFinish = (v: any) => {
    const expiredDate = renderExpiredDate(v.expiredDate);
    const body: BodyUpPackage = { id: detailData.id ?? "", expiredDate, key: v.key };
    upPackage(body, off);
  };

  return (
    <Modal open={open} title="Title" confirmLoading={loading.edit} onOk={() => form.submit()} onCancel={off}>
      <div className="border-0 border-t border-b border-solid border-black border-opacity-10 pt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label={t("Chọn gói")} name="key" rules={rulesForm.keyPackage}>
            <Select options={OptionPackage} placeholder={t("Chọn gói")} />
          </Form.Item>

          <Form.Item label={t("Thời gian")} name="expiredDate" rules={rulesForm.expiredDate}>
            <Select options={TimeOption} placeholder={t("Chọn thời gian")} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default React.memo(CModalUpPackage);

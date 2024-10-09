import useProvince from "@/hooks/useProvince";
import { SuccessFunc, VoidFunc } from "@/models";
import { func } from "@/utils/func";
import useGlobalService from "@/utils/useGlobalService";
import { Col, Form, Input, Modal, Row, Select, Switch } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import useLocationService from "../useLocationService";
import { ILocation } from "@/models/location";

interface ICModalCreatLocationProps {
  open?: boolean;
  off: VoidFunc;
  onSuccessUpdate: SuccessFunc<ILocation>;
}
const CModalCreatLocation = (props: ICModalCreatLocationProps) => {
  const { off, open, onSuccessUpdate } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { loading, create } = useLocationService();
  const { districts, onChangeDistricts, onChangeProvince, province, wards } = useProvince();
  const { rulesForm } = useGlobalService();
  const onFinish = (v: any) => {
    create(v, onSuccess);
  };
  const onSuccess = (value: ILocation) => {
    onSuccessUpdate(value);
    off();
  };
  return (
    <Modal
      open={open}
      title={t("Thêm mới chi nhánh")}
      confirmLoading={loading.create}
      onOk={() => form.submit()}
      onCancel={off}
      width={700}
    >
      <div className="border-0 border-t border-b border-solid border-black border-opacity-10 pt-4 pb-1">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={t("Tên chi nhánh")} name="name" rules={rulesForm.name}>
                <Input placeholder={t("Nhập tên chi nhánh")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("Số điện thoại")} name="phone" rules={rulesForm.phone}>
                <Input placeholder={t("Nhập số điện thoại")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("Tỉnh/ Thành phố")} name="city" rules={rulesForm.city}>
                <Select
                  placeholder="Enter your city name ..."
                  onChange={(value) => {
                    onChangeProvince(value);
                    form.setFieldValue("districtId", undefined);
                  }}
                  options={province}
                  filterOption={(input: string, option?: { label: string; value: string }) =>
                    func
                      .removeVietnameseDiacritics(option?.label ?? "")
                      .toLowerCase()
                      .includes(func.removeVietnameseDiacritics(input.toLowerCase()))
                  }
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("Quận/ Huyện")} name="district" rules={rulesForm.district}>
                <Select
                  placeholder="Enter your district ..."
                  onChange={(value) => {
                    onChangeDistricts(value);
                    form.setFieldValue("wardId", undefined);
                  }}
                  options={districts}
                  filterOption={(input: string, option?: { label: string; value: string }) =>
                    func
                      .removeVietnameseDiacritics(option?.label ?? "")
                      .toLowerCase()
                      .includes(func.removeVietnameseDiacritics(input.toLowerCase()))
                  }
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("Xã/ Phường")} name="ward" rules={rulesForm.ward}>
                <Select
                  options={wards}
                  placeholder="Enter your city name ..."
                  filterOption={(input: string, option?: { label: string; value: string }) =>
                    func
                      .removeVietnameseDiacritics(option?.label ?? "")
                      .toLowerCase()
                      .includes(func.removeVietnameseDiacritics(input.toLowerCase()))
                  }
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={t("Địa chỉ")} name="address" rules={rulesForm.address}>
                <Input placeholder={t("Nhập địa chỉ cụ thể")} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={t("Đặt làm địa chỉ mặc định")} name="isDefault">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default React.memo(CModalCreatLocation);

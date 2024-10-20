import Text from "@/components/Text";
import { STORAGE } from "@/configs/storage";
import { VoidFunc } from "@/models";
import { ILocation } from "@/models/location";
import { localStorageUtil } from "@/service/storage";
import { posActions } from "@/store/modules/pos";
import { locationSelector } from "@/store/modules/pos/selector";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Col, Flex, Modal, Row, message } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

type IModalLocationProps = {
  open?: boolean;
  off: VoidFunc;
  locations: ILocation[];
};

const ModalLocation = (props: IModalLocationProps) => {
  const { off, open, locations } = props;
  const location = useSelector(locationSelector);
  const { t } = useTranslation();

  const [crrLocation, setCrrLocation] = useState<ILocation>();

  const dispatch = useDispatch();

  const closeModal = () => {
    const locationId = localStorageUtil.get(STORAGE.LOCATION_ID);
    if (!locationId) return message.warning("Bạn cần chọn chi nhánh để bán hàng!");
    else off();
  };

  const onChangeLocation = () => {
    if (!crrLocation) return;
    dispatch(posActions.setLocation(crrLocation));
    localStorageUtil.set(crrLocation.id ?? "", STORAGE.LOCATION_ID);
    off();
  };

  useEffect(() => {
    location && setCrrLocation(location);
  }, [location]);
  return (
    <Modal open={open} title={t("Chọn chi nhánh bán hàng")} onOk={onChangeLocation} onCancel={closeModal} width={860}>
      <Flex vertical className="border-0 border-t border-b border-solid border-black border-opacity-10 pt-4 pb-1">
        <Row className="w-full pb-2" gutter={[12, 12]}>
          <Col span={6}>
            <Text type="HEADLINE" className="font-semibold">
              {t("Tên chi nhánh")}
            </Text>
          </Col>
          <Col span={14}>
            <Text type="HEADLINE" className="font-semibold">
              {t("Địa chỉ")}
            </Text>
          </Col>
          <Col span={4}>
            <Text type="HEADLINE" className="font-semibold text-center">
              {t("Thao tác")}
            </Text>
          </Col>
        </Row>
        {locations?.map((l, idx) => (
          <Row className="w-full py-1" gutter={[12, 12]} key={`modal-location-${idx}`}>
            <Col span={6}>
              <Text>{l?.name}</Text>
            </Col>
            <Col span={14}>
              <Text>{`${l.address}, ${l.ward}, ${l.district}, ${l.city}.`}</Text>
            </Col>
            <Col span={4}>
              <Flex justify="center">
                {crrLocation?.id === l.id ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <Button type="link" onClick={() => setCrrLocation(l)}>
                    {t("Chọn")}
                  </Button>
                )}
              </Flex>
            </Col>
          </Row>
        ))}
      </Flex>
    </Modal>
  );
};

export default React.memo(ModalLocation);

import { IconBell } from "@/assets/Icon";
import Text from "@/components/Text";
import { STORAGE } from "@/configs/storage";
import { useTitle } from "@/hooks/useTitle";
import { cookieStorageUtil } from "@/service/storage";
import { authActions } from "@/store/modules/auth";
import { userSelector } from "@/store/modules/auth/selector";
import { PATHNAME } from "@/utils/Pathname";
import { func } from "@/utils/func";
import { Dropdown, Flex, Image, MenuProps, Tooltip } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { title } = useTitle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector(userSelector);

  const handleLogout = () => {
    cookieStorageUtil.remove(STORAGE.NAAT_TOKEN_KEY);
    dispatch(authActions.clear());
    return navigate(PATHNAME.AUTH.LOGIN);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Text type="BODY">{account?.name}</Text>,
    },
    {
      key: "2",
      label: (
        <Text onClick={handleLogout} type="BODY">
          {t("Logout")}
        </Text>
      ),
    },
  ];

  return (
    <div className="h-[78px] ">
      <div className="py-5 px-6 ">
        <Flex justify="space-between">
          <Text type="TITLE1">{title}</Text>
          <Flex align="center" gap={16}>
            <Tooltip title={t("Notification")}>
              <div className="px-2 rounded-md bg-gray-50 cursor-pointer">
                <IconBell />
              </div>
            </Tooltip>
            <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
              <Image
                className="rounded-lg cursor-pointer"
                width={40}
                height={40}
                src={func.avatar(account?.name, account?.image)}
                preview={false}
              />
            </Dropdown>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default React.memo(Header);

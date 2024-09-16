import { IconBell } from "@/assets/Icon";
import Text from "@/components/Text";
import { STORAGE } from "@/configs/storage";
import { useTitle } from "@/hooks/useTitle";
import { cookieStorageUtil } from "@/service/storage";
import { authActions } from "@/store/modules/auth";
import { PATHNAME } from "@/utils/Pathname";
import { func } from "@/utils/func";
import { Dropdown, Flex, Image, MenuProps, Tooltip } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  const { title } = useTitle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    cookieStorageUtil.remove(STORAGE.PAT_TOKEN_KEY);
    dispatch(authActions.clear());
    return navigate(PATHNAME.LOGIN);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Text type="CAPTION2">{t("Info")}</Text>,
    },
    {
      key: "2",
      label: (
        <Text onClick={handleLogout} type="CAPTION2">
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
            <Dropdown
              menu={{ items }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <Image
                className="rounded-lg cursor-pointer"
                width={48}
                height={48}
                src={func.defaultAvatar("Tuan")}
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

import { IconFrameLogin } from "@/assets/Icon";
import { STORAGE } from "@/configs/storage";
import { cookieStorageUtil } from "@/service/storage";
import { Flex } from "antd";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

interface ILoginLayoutProps {}

const LoginLayout = (props: ILoginLayoutProps) => {
  useEffect(() => {
    cookieStorageUtil.remove(STORAGE.NAAT_TOKEN_KEY);
  }, []);
  return (
    <Flex align="center" justify="center" className="h-[100vh] bg-gray-50">
      <div className="w-[1440px] border border-solid bg-white border-gray-200 xl:rounded-lg overflow-hidden shadow-lg">
        <div className="grid grid-cols-12">
          <Flex vertical justify="center" className="col-span-4 p-10">
            <Outlet />
          </Flex>
          <div className="col-span-8 bg-primary50 px-[70px] py-10">
            <IconFrameLogin />
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default React.memo(LoginLayout);

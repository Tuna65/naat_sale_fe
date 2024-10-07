import { IconAccount, IconOrder, IconPieChart, IconProduct } from "@/assets/Icon";
import Text from "@/components/Text";
import { PATHNAME } from "@/utils/Pathname";
import { Flex, Image, Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

import { sidebarSelector } from "@/store/modules/sidebar/selector";
import { useSelector } from "react-redux";
import { func } from "@/utils/func";
import useGlobalService from "@/utils/useGlobalService";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const openSidebar = useSelector(sidebarSelector);
  const { navItem } = useGlobalService();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const activeKey = React.useMemo(() => {
    return [`/${pathname.split("/")[1]}`];
  }, [pathname]);

  useEffect(() => {
    setOpenKeys([pathname]);
  }, []);

  return (
    <div>
      <Flex>
        <div className="w-auto  border-0 border-r border-solid border-black border-opacity-10">
          <Flex
            className="h-[78px] border-0 border-b border-solid border-black border-opacity-10"
            justify="center"
            align="center"
          >
            {openSidebar ? (
              <Image className="rounded-lg" width={48} height={48} src={func.avatar("Nhím Store", "")} />
            ) : (
              <Text type="TITLE1" className="text-primary">
                {"Nhím Store"}
              </Text>
            )}
          </Flex>

          <div className="p-4">
            <Menu
              mode="inline"
              selectedKeys={activeKey}
              openKeys={openKeys}
              style={{ height: "100%" }}
              items={navItem}
              className=""
              onClick={(i) => navigate(i.key)}
              onOpenChange={(o) => setOpenKeys(o)}
              inlineCollapsed={openSidebar}
            />
          </div>
        </div>
        <div className="flex-1 h-[100vh] overflow-hidden">
          <div className="shadow-bottom relative z-10">
            <Header />
          </div>

          <div className="bg-[#fafafa] h-[calc(100vh-88px)] p-6 overflow-y-auto ">
            <Outlet />
          </div>
        </div>
      </Flex>
    </div>
  );
};

export default Layout;

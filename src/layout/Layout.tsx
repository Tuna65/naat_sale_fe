import {
  IconAccount,
  IconOrder,
  IconPieChart,
  IconProduct,
} from "@/assets/Icon";
import Text from "@/components/Text";
import { PATHNAME } from "@/utils/Pathname";
import { Flex, Layout as LayoutAnt, Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

const { Content, Footer, Sider } = LayoutAnt;

interface Props {}

const Layout = (props: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const activeKey = React.useMemo(() => {
    return [pathname];
  }, [pathname]);

  useEffect(() => {
    setOpenKeys([pathname]);
  }, []);

  return (
    <div>
      <Flex>
        <Sider width={270}>
          <Flex className="py-7 px-12" justify="start" align="center">
            <Text type="TITLE1" className="text-primary">
              NhimStore
            </Text>
          </Flex>
          <Menu
            mode="inline"
            selectedKeys={activeKey}
            openKeys={openKeys}
            style={{ height: "100%" }}
            items={navItem}
            className="px-4"
            onClick={(i) => navigate(i.key)}
            onOpenChange={(o) => setOpenKeys(o)}
          />
        </Sider>
        <div className="flex-1 h-[100vh] overflow-hidden">
          <div className="shadow-bottom">
            <Header />
          </div>

          <div className="bg-gray-100 h-[calc(100vh-88px)] p-8 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </Flex>
    </div>
  );
};

export default Layout;
const navItem: MenuProps["items"] = [
  {
    key: PATHNAME.DASHBOARD,
    icon: React.createElement(IconPieChart),
    label: `Dashboard`,
  },
  {
    key: "PATHNAME.ORDER",
    icon: React.createElement(IconOrder),
    label: <Text type="HEADLINE">{"Order"}</Text>,
    children: [
      {
        key: PATHNAME.ORDER.INDEX,
        label: <Text type="HEADLINE">{"Order"}</Text>,
      },
    ],
  },
  {
    key: "PATHNAME.PRODUCT",
    icon: React.createElement(IconProduct),
    label: <Text type="HEADLINE">{"Product"}</Text>,
    children: [
      {
        key: PATHNAME.PRODUCT.INDEX,
        label: <Text type="HEADLINE">{"Product"}</Text>,
      },
      {
        key: PATHNAME.PRODUCT_GROUP,
        label: <Text type="HEADLINE">{"Product group"}</Text>,
      },
    ],
  },
  {
    key: "PATHNAME.USER",
    icon: React.createElement(IconAccount),
    label: <Text type="HEADLINE">{"User"}</Text>,
    children: [
      {
        key: PATHNAME.USER.INDEX,
        label: <Text type="HEADLINE">{"Users"}</Text>,
      },
    ],
  },
];

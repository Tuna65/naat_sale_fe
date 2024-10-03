import { Spin } from "antd";
import { Suspense, lazy } from "react";
import { PATHNAME } from "@/utils/Pathname";
import { TRouterList } from "@/models";

const LazyLayout = (importStatement: () => Promise<any>) => {
  const Component = lazy(importStatement);

  return (
    <Suspense
      fallback={
        <div className="flex-center h-full">
          <Spin size="large" />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};
export const Dashboard = () => LazyLayout(() => import("./dashboard"));
export const Product = () => LazyLayout(() => import("./product"));
export const Order = () => LazyLayout(() => import("./order"));
export const Users = () => LazyLayout(() => import("./user"));
export const Login = () => LazyLayout(() => import("./auth/Login"));
export const Register = () => LazyLayout(() => import("./auth/Register"));
export const CreateShop = () => LazyLayout(() => import("./shop/CreateShop"));
export const Shop = () => LazyLayout(() => import("./shop"));

export const routerList: TRouterList[] = [
  {
    component: <Users />,
    path: PATHNAME.USER.INDEX,
  },
  {
    component: <Order />,
    path: PATHNAME.ORDER.INDEX,
  },
  {
    component: <Dashboard />,
    path: PATHNAME.DASHBOARD,
  },
  {
    component: <Product />,
    path: PATHNAME.PRODUCT.INDEX,
  },
];

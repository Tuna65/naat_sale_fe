import { Spin } from "antd";
import { Suspense, lazy } from "react";
import { PATHNAME } from "@/utils/Pathname";
import { TRouterList } from "@/models";

const LazyLayout = (importStatement: () => Promise<any>) => {
  const Component = lazy(importStatement);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full">
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
export const Users = () => LazyLayout(() => import("./account"));
export const Login = () => LazyLayout(() => import("./auth/Login"));
export const Register = () => LazyLayout(() => import("./auth/Register"));
export const CreateShop = () => LazyLayout(() => import("./shop/CreateShop"));
export const EditShop = () => LazyLayout(() => import("./shop/EditShop"));
export const Shop = () => LazyLayout(() => import("./shop"));
export const CreatAccount = () => LazyLayout(() => import("./account/CreatAccount"));
export const EditAccount = () => LazyLayout(() => import("./account/EditAccount"));
export const AccountDetail = () => LazyLayout(() => import("./account/AccountDetail"));
export const CreatePackage = () => LazyLayout(() => import("./package/CreatePackage"));
export const Package = () => LazyLayout(() => import("./package"));
export const EditPackage = () => LazyLayout(() => import("./package/EditPackage"));
export const Location = () => LazyLayout(() => import("./location"));
export const Role = () => LazyLayout(() => import("./role"));
export const ProductGroup = () => LazyLayout(() => import("./productGroup"));
export const CreateRole = () => LazyLayout(() => import("./role/CreateRole"));
export const CreateProduct = () => LazyLayout(() => import("./product/CreateProduct"));
export const EditProduct = () => LazyLayout(() => import("./product/EditProduct"));
export const ProductDetail = () => LazyLayout(() => import("./product/ProductDetail"));
export const Pos = () => LazyLayout(() => import("./pos"));
export const OrderDetail = () => LazyLayout(() => import("./order/OrderDetail"));

export const routerList: TRouterList[] = [
  {
    component: <OrderDetail />,
    path: PATHNAME.ORDER.DETAIL,
  },
  {
    component: <ProductDetail />,
    path: PATHNAME.PRODUCT.DETAIL,
  },
  {
    component: <EditProduct />,
    path: PATHNAME.PRODUCT.EDIT,
  },
  {
    component: <CreateProduct />,
    path: PATHNAME.PRODUCT.CREATE,
  },
  {
    component: <Product />,
    path: PATHNAME.PRODUCT.INDEX,
  },
  {
    component: <CreateRole />,
    path: PATHNAME.ROLE.CREATE,
  },
  {
    component: <Role />,
    path: PATHNAME.ROLE.INDEX,
  },
  {
    component: <ProductGroup />,
    path: PATHNAME.PRODUCT_GROUP.INDEX,
  },
  {
    component: <Location />,
    path: PATHNAME.LOCATION.INDEX,
  },
  {
    component: <AccountDetail />,
    path: PATHNAME.USER.DETAIL,
  },
  {
    component: <EditAccount />,
    path: PATHNAME.USER.EDIT,
  },
  {
    component: <CreatAccount />,
    path: PATHNAME.USER.CREATE,
  },
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
];

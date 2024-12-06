import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ComingSoon from "./components/ComingSoon";
import Layout from "./layout/Layout";
import ProtectedRoute from "./layout/ProtectedRoute";
import { CreatePackage, EditPackage, EditShop, Login, Package, Pos, Register, Shop, routerList } from "./pages";
import LoginLayout from "./pages/auth";
import CreateShop from "./pages/shop/CreateShop";
import { configAntdProvider } from "./utils";
import { PATHNAME } from "./utils/Pathname";
import Test from "./pages/test";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={configAntdProvider}>
          <Routes>
            <Route path="/" element={<Navigate replace to={PATHNAME.AUTH.LOGIN} />} />
            <Route path={"/test"} element={<Test />} />
            <Route element={<LoginLayout />}>
              <Route path={PATHNAME.AUTH.LOGIN} element={<Login />} />
              <Route path={PATHNAME.AUTH.REGISTER} element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path={PATHNAME.SALE} element={<Pos />} />
              <Route element={<Layout />}>
                {routerList.map((r, index) => {
                  return <Route path={r.path} element={r.component} key={`router-${index}`} />;
                })}
                <Route path={PATHNAME.COMMING_SOON} element={<ComingSoon />} />
                <Route path="*" element={<Navigate replace to={PATHNAME.COMMING_SOON} />} />
              </Route>
            </Route>

            {/* admin */}
            <Route path={PATHNAME.SHOP.EDIT} element={<EditShop />} />
            <Route path={PATHNAME.SHOP.CREATE} element={<CreateShop />} />
            <Route path={PATHNAME.SHOP.INDEX} element={<Shop />} />
            <Route path={PATHNAME.PACKAGE.CREATE} element={<CreatePackage />} />
            <Route path={PATHNAME.PACKAGE.INDEX} element={<Package />} />
            <Route path={PATHNAME.PACKAGE.EDIT} element={<EditPackage />} />
          </Routes>
        </ConfigProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

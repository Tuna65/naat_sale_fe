import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import ProtectedRoute from "./layout/ProtectedRoute";
import LoginLayout from "./pages/auth";
import { configAntdProvider } from "./utils";
import { ConfigProvider } from "antd";
import { Login, Register, Shop, routerList } from "./pages";
import { PATHNAME } from "./utils/Pathname";
import ComingSoon from "./components/ComingSoon";
import CreateShop from "./pages/shop/CreateShop";

function App() {
  return (
    <>
      <ConfigProvider theme={configAntdProvider}>
        <Routes>
          <Route path="/" element={<Navigate replace to={PATHNAME.AUTH.LOGIN} />} />
          <Route element={<LoginLayout />}>
            <Route path={PATHNAME.AUTH.LOGIN} element={<Login />} />
            <Route path={PATHNAME.AUTH.REGISTER} element={<Register />} />
          </Route>
          <Route path={PATHNAME.SHOP.CREATE} element={<CreateShop />} />
          <Route path={PATHNAME.SHOP.INDEX} element={<Shop />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {routerList.map((r, index) => {
                return <Route path={r.path} element={r.component} key={`router-${index}`} />;
              })}
              <Route path={PATHNAME.COMMING_SOON} element={<ComingSoon />} />
              <Route path="*" element={<Navigate replace to={PATHNAME.COMMING_SOON} />} />
            </Route>
          </Route>
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;

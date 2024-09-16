import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import ProtectedRoute from "./layout/ProtectedRoute";
import Login from "./pages/auth/Login";
import { configAntdProvider } from "./utils";
import { ConfigProvider } from "antd";
import { routerList } from "./pages";
import { PATHNAME } from "./utils/Pathname";
import ComingSoon from "./components/ComingSoon";

function App() {
  return (
    <>
      <ConfigProvider theme={configAntdProvider}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {routerList.map((r, index) => {
                return (
                  <Route
                    path={r.path}
                    element={r.component}
                    key={`router-${index}`}
                  />
                );
              })}
              <Route path={PATHNAME.COMMING_SOON} element={<ComingSoon />} />
              <Route
                path="*"
                element={<Navigate replace to={PATHNAME.COMMING_SOON} />}
              />
            </Route>
          </Route>
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;

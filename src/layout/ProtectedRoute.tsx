import { accountApi } from "@/apis/account";
import { STORAGE } from "@/configs/storage";
import useAsync from "@/hooks/useApi";
import { cookieStorageUtil } from "@/service/storage";
import { authActions } from "@/store/modules/auth";
import { PATHNAME } from "@/utils/Pathname";
import { Spin } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const naviage = useNavigate();
  const dispatch = useDispatch();

  const { execute: detailToken, loading } = useAsync(accountApi.detailByToken, {
    onSucess: (response: any) => {
      dispatch(authActions.setUser(response));
    },
    onFailed: (_error) => {},
  });

  React.useEffect(() => {
    const token = cookieStorageUtil.get(STORAGE.NAAT_TOKEN_KEY);
    if (!token) naviage(PATHNAME.AUTH.LOGIN);
    token && detailToken();
  }, []);

  return (
    <div>
      <Spin
        style={{ zIndex: 9998 }}
        spinning={loading}
        size="large"
        fullscreen={true}
        tip={"Loading..."}
        indicator={<Spin />}
      />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;

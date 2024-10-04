import { STORAGE } from "@/configs/storage";
import useAccountService from "@/pages/user/useAccountService";
import { cookieStorageUtil } from "@/service/storage";
import { PATHNAME } from "@/utils/Pathname";
import React from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const naviage = useNavigate();
  const { detailToken } = useAccountService();

  const token = cookieStorageUtil.get(STORAGE.NAAT_TOKEN_KEY);
  if (!token) naviage(PATHNAME.AUTH.LOGIN);

  React.useEffect(() => {
    token && detailToken();
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;

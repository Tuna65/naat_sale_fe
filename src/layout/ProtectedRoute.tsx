import { STORAGE } from "@/configs/storage";
import useAccountService from "@/pages/account/useAccountService";
import { cookieStorageUtil } from "@/service/storage";
import { PATHNAME } from "@/utils/Pathname";
import React from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const naviage = useNavigate();
  const { detailToken } = useAccountService();

  React.useEffect(() => {
    const token = cookieStorageUtil.get(STORAGE.NAAT_TOKEN_KEY);
    if (!token) naviage(PATHNAME.AUTH.LOGIN);
    token && detailToken();
  }, []);
  
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;

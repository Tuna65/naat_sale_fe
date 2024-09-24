import { STORAGE } from "@/configs/storage";
import { cookieStorageUtil } from "@/service/storage";
import { PATHNAME } from "@/utils/Pathname";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

interface Props {}

const ProtectedRoute = (props: Props) => {
  const naviage = useNavigate();

  const token = cookieStorageUtil.get(STORAGE.NAAT_TOKEN_KEY);
  if (!token) naviage(PATHNAME.AUTH.LOGIN);
  
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;

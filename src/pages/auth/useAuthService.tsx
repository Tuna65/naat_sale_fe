import { authSaleApi } from "@/apis/auth";
import { STORAGE } from "@/configs/storage";
import { cookieStorageUtil } from "@/service/storage";
import { authActions } from "@/store/modules/auth";
import { BodySaleLogin } from "@/types/auth";
import { PATHNAME } from "@/utils/Pathname";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthService = () => {
  const { t } = useTranslation();

  const rulesForm = {
    username: [
      {
        required: true,
        message: t("Tên đăng nhập không được để trống"),
      },
      {
        pattern: /^[a-z0-9._]+$/,
        message: 'Username chỉ chứa chữ thường và ký tự đặc biệt là "." hoặc "_"',
      },
    ],
    password: [
      {
        required: true,
        message: t("Mật khẩu không được để trống"),
      },
    ],
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const login = async (body: BodySaleLogin) => {
    setLoading(true);
    try {
      const res = await authSaleApi.login(body);
      if (res) {
        dispatch(authActions.setUser(res));
        navigate(PATHNAME.DASHBOARD);
        cookieStorageUtil.set(res.accessToken, STORAGE.NAAT_TOKEN_KEY);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return { rulesForm, login, loading };
};

export default useAuthService;

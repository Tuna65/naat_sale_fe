import { authSaleApi } from "@/apis/auth";
import { authActions } from "@/store/modules/auth";
import { BodySaleLogin } from "@/types/auth";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

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
        message:
          'Username chỉ chứa chữ thường và ký tự đặc biệt là "." hoặc "_"',
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

  const login = async (body: BodySaleLogin) => {
    try {
      const res = await authSaleApi.login(body);
      if (res) {
        dispatch(authActions.setUser(res));
      }
    } catch (error) {}
  };
  return { rulesForm, login };
};

export default useAuthService;

import axios from "axios";
import { BASE_URL } from "../utils/env";
import { STORAGE } from "../configs/storage";
import { cookieStorageUtil } from "../service/storage";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // 'Accept-Language': localStorageUtil.get(IVIWORK_LANGUAGE_KEY)
    //   ? `${localStorageUtil.get(IVIWORK_LANGUAGE_KEY)}`
    //   : 'vi',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !!!originalRequest._retry &&
      cookieStorageUtil.get(STORAGE.PAT_TOKEN_KEY)
    ) {
      originalRequest._retry = true;
      try {
        return axiosInstance(originalRequest);
      } catch (error) {
        cookieStorageUtil.remove(STORAGE.PAT_TOKEN_KEY);
      }
    }
    return Promise.reject(error?.response);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${cookieStorageUtil.get(
      STORAGE.PAT_TOKEN_KEY
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

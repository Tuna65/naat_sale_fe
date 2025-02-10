import axios from "axios";
import { IGallery } from "@/models/gallery";
import http from "./http";

const path = `/gallery` as const;

export const galleryAPI = {
  async find(params?: any) {
    try {
      const res = await http.get(`${path}`, { params });
      return res.data;
    } catch (error: any) {}
  },

  async upload(body: { file: any }): Promise<IGallery> {
    const url = "http://localhost:8065/gallery/upload";
    try {
      const res = await axios.post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code) throw Error(res.data.message);
      return res.data;
    } catch (error: any) {
      const { message, code } = error || {};
      return Promise.reject({
        status: false,
        message: error?.data?.message ?? message,
        code: code,
      });
    }
  },
};

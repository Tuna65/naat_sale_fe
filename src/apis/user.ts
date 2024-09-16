import { ResPagination } from "@/models";

import { message } from "antd";
import axiosInstance from "./restclient";

const path = `/user` as const;

export const userApi = {
  async find(params?: any): Promise<ResPagination<any> | any> {
    try {
      const res = await axiosInstance.get(`${path}`, { params });
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async create(body: any): Promise<any | any> {
    try {
      const res = await axiosInstance.post(`${path}`, body);
      if (res.data.code) throw Error(res.data.message);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async update(body: any, id: string): Promise<any | any> {
    try {
      const res = await axiosInstance.put(`${path}/${id}`, body);
      if (res.data.code) throw Error(res.data.message);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async changePassword(body: any): Promise<any | any> {
    try {
      const res = await axiosInstance.put(`${path}/change-password`, body);
      if (res.data.code) throw Error(res.data.message);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async detail(
    id: string,
    businessId?: string,
    shopId?: string
  ): Promise<any | any> {
    try {
      const res = await axiosInstance.get(
        `${path}/${id}?businessId=${businessId}&shopId=${shopId}`
      );
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async detailByToken(
    businessId?: string,
    shopId?: string
  ): Promise<any | any> {
    try {
      const res = await axiosInstance.get(`${path}/me`, {
        params: { businessId, shopId },
      });
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async delete(id: string): Promise<any | any> {
    try {
      const res = await axiosInstance.delete(`${path}/${id}`);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },
};

import { ResPagination } from "@/models";
import { IOrder } from "@/models/order";
import { QueryOrder } from "@/types/order";

import { message } from "antd";
import http from "./http";

const path = `/order` as const;

export const orderApi = {
  async find(params?: QueryOrder): Promise<ResPagination<IOrder> | any> {
    try {
      const res = await http.get(`${path}`, { params: params?.queryKey[1] });
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async create(body: IOrder) {
    try {
      const res = await http.post(`${path}`, body);
      if (typeof res.data.code !== "string") throw Error(res.data.message);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async detail(id: string) {
    try {
      const res = await http.get(`${path}/${id}`);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async delete(id: string) {
    try {
      const res = await http.delete(`${path}/${id}`);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },
};

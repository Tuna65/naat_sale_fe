import { ResPagination } from "@/models";
import { ILocation } from "@/models/location";

import { message } from "antd";
import http from "./http";

const path = `/location` as const;

export const locationApi = {
  async find(): Promise<ResPagination<ILocation> | any> {
    try {
      const res = await http.get(`${path}`);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async create(body: ILocation): Promise<any | any> {
    try {
      const res = await http.post(`${path}`, body);
      if (res.data.code) throw Error(res.data.message);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async edit(body: any, id: string): Promise<any | any> {
    try {
      const res = await http.put(`${path}/${id}`, body);
      if (res.data.code) throw Error(res.data.message);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async detail(id: string): Promise<any | any> {
    try {
      const res = await http.get(`${path}/${id}`);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async delete(id: string): Promise<any | any> {
    try {
      const res = await http.delete(`${path}/${id}`);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },
};

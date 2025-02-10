import { ResPagination } from "@/models";
import { IProduct } from "@/models/product";
import { message } from "antd";
import http from "./http";
import { IQueryProduct } from "@/types/product";

const path = `/product` as const;

export const productApi = {
  async find(): Promise<ResPagination<IProduct> | any> {
    try {
      const res = await http.get(`${path}`);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async query(params?: IQueryProduct): Promise<ResPagination<IProduct> | any> {
    try {
      const res = await http.get(`${path}`, { params: params?.queryKey[1] });
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async create(body: IProduct): Promise<any | any> {
    try {
      const res = await http.post(`${path}`, body);
      if (res.data.code) throw Error(res.data.message);
      return res.data;
    } catch (error: any) {
      message.error(error?.data?.message ?? error?.data?.message[0]);
    }
  },

  async edit(id: string, body: any): Promise<any | any> {
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

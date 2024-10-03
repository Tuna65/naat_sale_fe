import { IBasePagination } from ".";

export interface ICreateShopProps {}

export interface QueryShop extends IBasePagination {
  name?: string;
}

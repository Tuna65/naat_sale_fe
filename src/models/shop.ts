import { EShopStatus } from "@/enum/EShopStatus";
import { IBaseEntity } from ".";

export interface IShop extends IBaseEntity {
  status: EShopStatus;
  name: string;
  shopAlias: string;
  phone: string;
  image: string;
  packageId: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  expiredDate: Date;
}

import { EShopStatus } from "@/enum/EShopStatus";
import { IBaseEntity } from ".";

export interface IShop extends IBaseEntity {
  status: EShopStatus;
  name: string;
  shopAlias: string;
  image: string;
  packageId: string;
  expiredDate: Date;
}

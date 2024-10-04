import { IBaseEntity } from ".";

export interface IShop extends IBaseEntity {
  status: string;
  name: string;
  package: string;
  alias: string;
  image: string;
}

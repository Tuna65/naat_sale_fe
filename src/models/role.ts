import { IBaseEntity } from ".";

export interface IRole extends IBaseEntity {
  permmission: string[];

  name: string;

  description: string;

  shopId: string;
}

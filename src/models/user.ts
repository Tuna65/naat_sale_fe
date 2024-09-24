import { IBaseEntity } from ".";

export interface IUser extends IBaseEntity {
  fullname: string;

  username: string;

  password: string;

  email: string;

  phone: string;

  shopId: string;

  image: string;

  // role?: Role;

  roleId?: string;
}

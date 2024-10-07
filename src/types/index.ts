export interface IBaseLoading {
  create: boolean;
  edit: boolean;
  find: boolean;
  delete: boolean;
  detail: boolean;
}

export interface IBasePagination {
  page?: string;
  limit?: string;
}

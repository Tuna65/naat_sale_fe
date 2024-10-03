export interface IBaseLoading {
  create: boolean;
  edit: boolean;
  find: boolean;
  delete: boolean;
}

export interface IBasePagination {
  page: number;
  limit: number;
}

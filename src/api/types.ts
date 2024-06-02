import { Product } from '../types';

export interface CommonQueryParams {
  [key: string]: boolean | number | string | string[] | undefined;
}

export type SortOrder = 'asc' | 'desc';

export interface SortType {
  price?: SortOrder;
  id?: SortOrder;
}

export interface FetchProductsQueryParams {
  page: number;
  size: number;
  sort: SortType;
  category?: string;
}

export interface FetchProductsResponse {
  last: boolean;
  content: Product[];
}

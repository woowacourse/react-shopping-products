import { Pageable, Product, Sort } from "../../types/response.types";

export interface ProductPageResponse {
  content: Product[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
  sort: Sort;
}

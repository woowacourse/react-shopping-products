import { Pageable, Product, Sort } from "../../types/response.types";

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartProduct {
  content: CartItem[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

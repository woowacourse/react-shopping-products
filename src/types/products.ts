import { CategoryKeys, SortOptionsKeys } from "../constants/products";

export interface ProductsRequestUrlOptions {
  page: number;
  category?: CategoryKeys;
  sort?: SortOptionsKeys;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductsServerResponse {
  content: Product[];
  last: boolean;
  pageable: {
    pageNumber: number;
  };
}

export interface Products {
  products: Product[];
  isLastPage: boolean;
  currentPage: number;
}

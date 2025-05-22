import { BaseFetchItemsResult } from "./FetchCartItemsResult";
import { Product } from "./Product";

export type FetchProductListResult = {
  content: Product[];
} & BaseFetchItemsResult;

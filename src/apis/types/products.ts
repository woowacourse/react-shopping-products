import { PaginatedResponse } from "./pagination";

export interface BaseProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

export type Products = PaginatedResponse<BaseProduct>;

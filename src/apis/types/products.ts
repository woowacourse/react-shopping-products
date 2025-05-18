import { PaginatedResponse } from "./pagination";

export interface BaseProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export type Products = PaginatedResponse<BaseProduct>;

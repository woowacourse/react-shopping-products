import { CATEGORIES, SORTS } from "@/constants/product";

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export type Category = (typeof CATEGORIES)[number];

export type Sort = (typeof SORTS)[number];

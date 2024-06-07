import { CATEGORIES, SORTS } from "@/constants/product";

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: `http://${string}` | `https://${string}`;
  category: Category;
  quantity?: number;
}

export type Category = (typeof CATEGORIES)[number];

export type Sort = (typeof SORTS)[number];

export interface CartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

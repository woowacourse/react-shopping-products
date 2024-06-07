export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export type Category =
  | "beverage"
  | "books"
  | "fashion"
  | "fitness"
  | "kitchen"
  | "electronics";

export type Sort = "price,id,asc" | "price,id,desc";

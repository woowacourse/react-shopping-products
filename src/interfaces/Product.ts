export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export type Category =
  | "books"
  | "electronics"
  | "kitchen"
  | "fashion"
  | "fitness"
  | "beverage";

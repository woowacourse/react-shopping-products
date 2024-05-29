type Category =
  | "fashion"
  | "electronics"
  | "beverage"
  | "kitchen"
  | "fitness"
  | "books";

type Sort = "asc" | "desc";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

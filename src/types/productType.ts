export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity?: number;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export type Category = "식료품" | "패션잡화" | "전체";
export type PriceOrder = "낮은 가격순" | "높은 가격순";

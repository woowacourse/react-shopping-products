export type CategoryOption = "전체" | "식료품" | "패션잡화";
export type FilterOption = "낮은 가격순" | "높은 가격순";
export type sortOption = "price,asc" | "price,desc";

interface ProductItemType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductItemType;
}

export interface ProductType {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
}

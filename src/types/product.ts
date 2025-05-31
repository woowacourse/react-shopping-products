export type ProductCategory = "식료품" | "패션잡화";

export interface ProductItemType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  quantity: number;
}

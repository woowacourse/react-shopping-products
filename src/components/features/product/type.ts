export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: ProductCategoryType;
  quantity: number;
}
export type ProductCategoryType = '전체' | '식료품' | '패션잡화';

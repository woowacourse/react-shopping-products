export type CategoryType = '식료품' | '패션잡화';

export interface ProductItemType {
  id: number;
  name: string;
  category: CategoryType;
  price: number;
  imageUrl: string;
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export enum SortOrder {
  'asc' = '낮은 가격 순',
  'desc' = '높은 가격 순',
}

export type SortType = '낮은 가격 순' | '높은 가격 순';

export type SortKeyType = keyof typeof SortOrder;

export type FetchMethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH';

export type CategoryType = '전체' | '식료품' | '패션잡화';

export type SelectedSortType = '높은 가격순' | '낮은 가격순';

export type SortType = 'desc' | 'asc';

export interface ProductItemType {
  id: number;
  name: string;
  category: CategoryType;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartItemType {
  id: number;
  product: ProductItemType;
  quantity: number;
}

export type ProductElement = {
  product: ProductType;
  cartId: number | null;
  isInCart: boolean;
}

export type ProductType = {
  category: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity?: number;
}

export type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
}

export type CartResponse = {
  content: CartItem[];
  totalElements: number;
}

export enum SortOrder {
  'asc' = '낮은 가격 순',
  'desc' = '높은 가격 순',
}

export type SortType = '낮은 가격 순' | '높은 가격 순';

export type SortKeyType = keyof typeof SortOrder;

export type CategoryType = '전체' | '식료품' | '패션잡화';

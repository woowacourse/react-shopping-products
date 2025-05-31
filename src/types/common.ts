export type SortOption = '높은 가격순' | '낮은 가격순';
export type CategoryOption = '전체' | '패션잡화' | '식료품';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
};

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

import Product from './routes/Product';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

export interface CartProduct {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartInfo {
  id: number;
  quantity: number;
}

export interface Info {
  content: Product[];
  [key: string]: unknown;
}

export interface MergedData extends Product {
  cartInfo: {
    id: number;
    quantity: number;
  };
}

export type SortingType = 'asc' | 'desc';
export type filterType = '식료품' | '패션잡화';
export type HandleCartProductsKeyword = 'add' | 'remove' | 'patch';

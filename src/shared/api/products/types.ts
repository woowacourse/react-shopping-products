import { PageableObject, SortObject } from '../types';

export type Category = 'fashion' | 'beverage' | 'electronics' | 'kitchen' | 'fitness' | 'books';

export type SortOrder = 'price,id,asc' | 'price,id,desc';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}

export interface ProductsResponse {
  totalPages: number;
  totalElements: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  pageable: PageableObject;
  number: number;
  numberOfElements: number;
  size: number;
  content: Product[];
  empty: boolean;
}

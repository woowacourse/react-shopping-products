export type Category = 'fashion' | 'beverage' | 'electronics' | 'kitchen' | 'fitness' | 'books';

export type SortOrder = 'price,id,asc' | 'price,id,desc';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}

import { Category } from './filter.type';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
};

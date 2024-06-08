import { Product } from './fetch';

export const Orders = ['asc', 'desc'];
export type Order = (typeof Orders)[number];

export interface SortingParam {
  name: keyof Product;
  order: Order;
}

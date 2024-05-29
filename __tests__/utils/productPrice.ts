import { Product } from '../../src/appTypes/product';

export const isAscendingPrice = (product: Product, index: number, currentProducts: Product[]) =>
  index === 0 || product.price >= currentProducts[index - 1].price;

export const isDescendingPrice = (product: Product, index: number, currentProducts: Product[]) =>
  index === 0 || product.price <= currentProducts[index - 1].price;

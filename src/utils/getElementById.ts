import { CartProduct, Product } from '../types';

const getElementById = <T>(elements: (Product | CartProduct)[], id: number) => {
  return elements.filter((element) => element.id === id) as T;
};

export default getElementById;

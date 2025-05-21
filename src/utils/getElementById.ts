import { CartProduct, Product } from '../types';

const getElementById = (elements: (Product | CartProduct)[], id: number) => {
  return elements.filter((element) => element.id === id);
};

export default getElementById;

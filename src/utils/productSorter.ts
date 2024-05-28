import { Product, ProductResponse } from '../types/fetch';
import { Order } from '../types/sort';

const productSorter = (sortings: string[], productCopy: ProductResponse) => {
  sortings.forEach((sorting) => {
    const [name, order] = sorting.split(',') as [keyof Product, Order];
    if (name === 'name' || name === 'imageUrl' || name === 'category') {
      productCopy.content.sort((a, b) => a[name].localeCompare(b[name]));
    } else {
      productCopy.content.sort((a, b) => a[name] - b[name]);
    }
    if (order === 'desc') {
      productCopy.content.reverse();
    }
  });

  return productCopy;
};

export default productSorter;

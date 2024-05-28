import { Product, ProductResponse } from '../types/fetch';
import { Order } from '../types/sort';

const productSorter = (sortings: string[], productCopy: ProductResponse) => {
  sortings.forEach((sorting) => {
    const [name, order] = sorting.split(',') as [keyof Product, Order];
    if (['name', 'imageUrl', 'category'].includes(name)) {
      productCopy.content.sort((a, b) =>
        (a[name] as string).localeCompare(b[name] as string),
      );
    } else {
      productCopy.content.sort(
        (a, b) => (a[name] as number) - (b[name] as number),
      );
    }
    if (order === 'desc') {
      productCopy.content.reverse();
    }
  });

  return productCopy;
};

export default productSorter;

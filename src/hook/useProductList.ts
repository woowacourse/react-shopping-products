import { useEffect, useState } from 'react';
import getProduct from '../api/product';
import { Product } from '../component/ProductContainer/ProductContainer';
import { CategoryOption, FilterOption, sortOption } from '../page/ShopPage';

export function useProductList(categoryValue: CategoryOption, filterValue: FilterOption) {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let sortBy: sortOption = 'price,asc';
    if (filterValue === '높은 가격순') sortBy = 'price,desc';

    (async () => {
      try {
        const response = await getProduct({ category: categoryValue, sortBy });
        setProductList(response.content);
      } catch (e) {
        setIsError(true);
      }
    })();
  }, [categoryValue, filterValue]);

  return { productList, isError };
}

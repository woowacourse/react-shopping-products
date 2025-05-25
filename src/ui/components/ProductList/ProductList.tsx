import Product from '../Product/Product';
import { CategoryType, ProductElement, SortKeyType } from '../../../types/type';
import { List } from './ProductList.styles';
import { useCallback, useMemo } from 'react';
import { getProduct } from '../../../api/fetchProduct';
import { useAPI } from '../../../hooks/useAPI';
import { SORT_PRICE_MAP } from '../../../constants/productConfig';

interface ProductListProps {
  category: CategoryType;
  sortBy: SortKeyType;
}

function ProductList({ category, sortBy }: ProductListProps) {
  const mappedSortType = SORT_PRICE_MAP[sortBy];
  const fetchProductList = useCallback(async () => {
    return await getProduct({ page: 0, size: 50, sortBy: mappedSortType }).then(
      (res) => res.content
    );
  }, [mappedSortType]);

  const { data: productList } = useAPI<ProductElement[]>({
    fetcher: fetchProductList,
    name: `productList`,
  });

  const filteredProductList = useMemo(() => {
    if (category === '전체') {
      return productList;
    }
    return productList?.filter(
      (item: ProductElement) => item.category === category
    );
  }, [category, productList]);

  return (
    <List>
      {filteredProductList?.map((item: ProductElement) => (
        <Product key={item.id} item={item} />
      ))}
    </List>
  );
}

export default ProductList;

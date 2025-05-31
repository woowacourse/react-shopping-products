import Product from '../Product/Product';
import { CategoryType, ProductElement, SortKeyType } from '../../../types/type';
import { List } from './ProductList.styles';
import { useMemo } from 'react';
import { useAPI } from '../../../hooks/useAPI';
import { SORT_PRICE_MAP } from '../../../constants/productConfig';
import { fetchProductList } from '../../../utils/getProductList';

interface ProductListProps {
  category: CategoryType;
  sortBy: SortKeyType;
}

function ProductList({ category, sortBy }: ProductListProps) {
  const mappedSortType = useMemo(() => {
    return SORT_PRICE_MAP[sortBy];
  }, [sortBy]);

  const { data: productList } = useAPI<ProductElement[]>({
    fetcher: () => fetchProductList(mappedSortType),
    name: `productList-${mappedSortType}`,
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

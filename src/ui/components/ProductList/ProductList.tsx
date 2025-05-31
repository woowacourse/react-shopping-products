import Product from '../Product/Product';
import { CategoryType, ProductElement, SortKeyType } from '../../../types/type';
import { List } from './ProductList.styles';
import { useAPI } from '../../../hooks/useAPI';
import { CATEGORY, SORT_PRICE_MAP } from '../../../constants/productConfig';
import { fetchProductList } from '../../../utils/getProductList';
import { API_CONFIG } from '../../../constants/APIConfig';

interface ProductListProps {
  category: CategoryType;
  sortBy: SortKeyType;
}

function ProductList({ category, sortBy }: ProductListProps) {
  const mappedSortType = SORT_PRICE_MAP[sortBy];
  const { data: productList } = useAPI<ProductElement[]>({
    fetcher: () => fetchProductList(mappedSortType),
    name: API_CONFIG.PRODUCT_NAME,
  });

  const filteredProductList = (() => {
    if (category === CATEGORY[0]) {
      return productList;
    }
    return productList?.filter(
      (item: ProductElement) => item.category === category
    );
  })();

  return (
    <List>
      {filteredProductList?.map((item: ProductElement) => (
        <Product key={item.id} item={item} />
      ))}
    </List>
  );
}

export default ProductList;

import { useInfiniteProductList } from '@/apis/queries/product';
import InfiniteScrollContainer from '@/components/InfiniteScrollContainer/InfiniteScrollContainer';
import ProductList from '@/components/ProductList/ProductList';
import { SortValue } from '@/constants/filter';
import { Category } from '@/types/filter.type';

type ProductListContainerProps = {
  category: Category;
  sortType: SortValue;
};

const ProductListContainer = ({ category, sortType }: ProductListContainerProps) => {
  const { data: productList, ...rest } = useInfiniteProductList(category, sortType);

  return (
    <InfiniteScrollContainer {...rest}>
      <ProductList productList={productList} />
    </InfiniteScrollContainer>
  );
};

export default ProductListContainer;

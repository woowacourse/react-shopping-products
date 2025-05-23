import Product from '../Product/Product';
import { ProductListSkeleton } from '../Skeleton/Skeleton';
import { ProductListContainer } from './ProductList.style';
import { useToast } from '../../hooks/useToast';
import { useGetProducts } from '../../hooks/useGetProducts';
import { ActionType } from '../../types/product';

type ProductListProps = {
  category: string;
  sort: string;
} & ActionType;

function ProductList({
  category,
  sort,
  onClickAddCartItem,
  onClickModifyCartItem,
}: ProductListProps) {
  const { openToast } = useToast();
  const { isLoading, isError, products } = useGetProducts({
    category,
    sort,
  });

  if (isError) {
    openToast('상품 정보를 불러오지 못했습니다.', 'error');
    return;
  }

  return (
    <ul className={ProductListContainer}>
      {isLoading && <ProductListSkeleton />}
      {products?.map((product, idx) => (
        <Product
          key={idx}
          product={product}
          onClickAddCartItem={onClickAddCartItem}
          onClickModifyCartItem={onClickModifyCartItem}
        />
      ))}
    </ul>
  );
}

export default ProductList;

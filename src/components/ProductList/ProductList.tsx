import { ProductDataType } from '../../types/product';
import Product from '../Product/Product';
import { ProductListSkeleton } from '../Skeleton/Skeleton';
import { ProductListContainer } from './ProductList.style';
import { DEFAULT_SKELETON_ITEM_COUNT } from '../../constants/skeleton';

type ProductListProps = {
  isLoadingProducts: boolean;
  products?: ProductDataType[];
};

function ProductList({ isLoadingProducts, products }: ProductListProps) {
  if (isLoadingProducts) {
    return <ProductListSkeleton count={DEFAULT_SKELETON_ITEM_COUNT} />;
  }

  return (
    <ul className={ProductListContainer}>
      {products?.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </ul>
  );
}

export default ProductList;

import { ProductDataType } from '../../types/product';
import Product from '../Product/Product';
import { AddCartItemType } from '../../types/cartItem';
import { ProductListSkeleton } from '../Skeleton/Skeleton';
import { ProductListContainer } from './ProductList.style';
import { DEFAULT_SKELETON_ITEM_COUNT } from '../../constants/skeleton';

type ProductListProps = {
  isLoadingProducts: boolean;
  products?: ProductDataType[];
  onClickAddCartItem: ({ productId, quantity }: AddCartItemType) => void;
  onClickDeleteCartItem: ({ productId }: { productId: number }) => void;
};

function ProductList({
  isLoadingProducts,
  products,
  onClickAddCartItem,
  onClickDeleteCartItem,
}: ProductListProps) {
  if (isLoadingProducts) {
    return <ProductListSkeleton count={DEFAULT_SKELETON_ITEM_COUNT} />;
  }

  return (
    <ul className={ProductListContainer}>
      {products?.map((product, idx) => (
        <Product
          key={idx}
          {...product}
          onClickAddCartItem={onClickAddCartItem}
          onClickDeleteCartItem={onClickDeleteCartItem}
        />
      ))}
    </ul>
  );
}

export default ProductList;

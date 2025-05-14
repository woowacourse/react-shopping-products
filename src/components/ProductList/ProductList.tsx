import { css } from '@emotion/css';
import { ProductDataType } from '../../types/product';
import Product from '../Product/Product';
import { AddCartItemType } from '../../types/cartItem';
import { ProductListSkeleton } from '../Skeleton/Skeleton';

const ProductListContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

type ProductListProps = {
  isLoadingProducts: boolean;
  products: ProductDataType[] | undefined;
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
    return <ProductListSkeleton />;
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

import * as Styled from './ProductCardList.styled';
import CartToggleButton from '../cartToggleButton/CartToggleButton';
import Spinner from '../common/spinner/Spinner';
import ProductCard from '../productCard/ProductCard';

import { CartItemInfo } from '@/types/cartItem';
import { Product } from '@/types/product';

interface ProductCardListProp {
  productList: Product[];
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
  matchCartItem: (productId: number) => CartItemInfo | undefined;
  isLoading: boolean;
}

const ProductCardList = ({
  productList,
  handleAddCartItem,
  handleDeleteCartItem,
  matchCartItem,
  isLoading,
}: ProductCardListProp) => {
  return (
    <>
      <Styled.ProductCardListWrapper>
        {productList.map((product, idx) => (
          <div key={`${product.id}_${idx}`}>
            <ProductCard imageUrl={product.imageUrl} name={product.name} price={product.price}>
              <CartToggleButton
                productId={product.id}
                handleAddCartItem={handleAddCartItem}
                handleDeleteCartItem={handleDeleteCartItem}
                matchedCartItem={matchCartItem(product.id)}
              />
            </ProductCard>
          </div>
        ))}
      </Styled.ProductCardListWrapper>
      {isLoading && <Spinner />}
    </>
  );
};

export default ProductCardList;

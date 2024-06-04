import { Product } from '../../types/type';
import ProductItemTitle from '../ProductItemTitle/ProductItemTitle';
import ToggleCartItemButton from '../ToggleCartItemButton/ToggleCartItemButton';

import * as S from './ProductItem.style';
import QuantityStepper from '../common/QuantityStepper/QuantityStepper';

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const isInCart = true;
  const quantity = 1;

  return (
    <S.ProductItem>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <S.ProductDescription>
        <ProductItemTitle title={product.name} price={product.price} />
        <S.ToggleCartItemButtonWrapper>
          {isInCart ? (
            <QuantityStepper
              quantity={quantity ?? 0}
              increaseQuantity={() => {}}
              decreaseQuantity={() => {}}
            />
          ) : (
            <ToggleCartItemButton isInCart={isInCart} onClick={() => {}} />
          )}
        </S.ToggleCartItemButtonWrapper>
      </S.ProductDescription>
    </S.ProductItem>
  );
}

export default ProductItem;

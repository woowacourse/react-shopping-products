import { Carts, Product } from '../../types/fetch';
import { CartButton } from '../index';
import { useFetchAddCart } from '../../hooks';

import * as S from './ProductCard.styled';

interface ProductCardProps {
  product: Product;
  cartItem: Carts | null;
}

function ProductCard({ product, cartItem }: ProductCardProps) {
  const { addCartItem } = useFetchAddCart();

  return (
    <div>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <S.ContentWrapper>
        <S.InfoWrapper>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.InfoWrapper>

        <S.ButtonContainer>
          <CartButton
            cartItem={cartItem}
            onAddClick={() => {
              addCartItem(product.id);
            }}
          />
        </S.ButtonContainer>
      </S.ContentWrapper>
    </div>
  );
}

export default ProductCard;

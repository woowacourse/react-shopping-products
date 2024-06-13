import { useContext } from 'react';

import { CartContext } from '../../context/CartContext';
import { Carts, Product } from '../../types/fetch';
import { CartButton } from '../index';

import * as S from './ProductCard.styled';
import getCartItemByProduct from '../../utils/getProductQuantity';
import { useFetchAddCart } from '../../hooks';

interface ProductCardProps {
  product: Product;
  cartItem: Carts | null;
}

function ProductCard({ product, cartItem }: ProductCardProps) {
  // const cartContext = useContext(CartContext);
  // if (!cartContext) {
  //   throw new Error('CartContext가 비어있습니다.');
  // }
  // const { addCartItem, getCartItemByProduct } = cartContext;
  // const cartItemByProduct = getCartItemByProduct(cartItems, product.id);
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

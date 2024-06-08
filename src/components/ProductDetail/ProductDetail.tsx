import { useContext } from 'react';

import { Carts } from '../../types/fetch';
import { CartContext } from '../../context/CartContext';

import * as S from './ProductDetail.styled';

interface ProductDetailProps {
  cartItems: Carts[];
}

function ProductDetail({ cartItems }: ProductDetailProps) {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('CartContext가 비어있습니다.');
  }
  const {
    addCartItem,
    deleteCartItem,
    // isDeletePending,
    // isDeleteError,
  } = cartContext;

  const handleDecreasedQuantity = () => {};

  const handleIncreasedQuantity = () => {};

  return (
    <S.ProductDetailContainer>
      {cartItems.map((item) => (
        <S.CardContainer>
          <S.CardContent>
            <S.ItemImg src={item.product.imageUrl} alt={item.product.name} />
            <S.CardDetail>
              <S.CardDetailWrapper>
                <S.CardInfo>
                  <S.ItemName>{item.product.name}</S.ItemName>
                  <S.ItemPrice>
                    {item.product.price.toLocaleString()}원
                  </S.ItemPrice>
                </S.CardInfo>

                <S.DeleteButton onClick={() => deleteCartItem(item.product.id)}>
                  삭제
                </S.DeleteButton>
              </S.CardDetailWrapper>
              <S.CardQuantityButton>
                <S.Button onClick={handleDecreasedQuantity}>-</S.Button>
                <p>{item.quantity}</p>
                <S.Button onClick={handleIncreasedQuantity}>+</S.Button>
              </S.CardQuantityButton>
            </S.CardDetail>
          </S.CardContent>
        </S.CardContainer>
      ))}
    </S.ProductDetailContainer>
  );
}

export default ProductDetail;

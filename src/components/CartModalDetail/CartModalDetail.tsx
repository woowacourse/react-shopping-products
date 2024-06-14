import { Carts } from '../../types/fetch';
import { QuantityUpdateButton } from '../index';
import { useFetchDeleteCart } from '../../hooks';

import * as S from './CartModalDetail.styled';

interface CartModalDetailProps {
  cartItems: Carts[];
}

function CartModalDetail({ cartItems }: CartModalDetailProps) {
  const { deleteCartItem } = useFetchDeleteCart();

  return (
    <S.CartModalDetailContainer>
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

              <QuantityUpdateButton item={item} />
            </S.CardDetail>
          </S.CardContent>
        </S.CardContainer>
      ))}
    </S.CartModalDetailContainer>
  );
}

export default CartModalDetail;

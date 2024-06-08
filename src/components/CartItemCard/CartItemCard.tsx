import { BUTTON_MESSAGE } from '../../constants/button';
import useCartItemHandler from '../../hooks/useCartItemHandler';
import * as S from './CartItemCard.style';
import { ProductProps } from './CartItemCard.type';

function CartItemCard({ item }: ProductProps) {
  const {
    itemQuantity,
    handleAddCartItemQuantity,
    handleMinusCartItemQuantity,
    handleDeleteCartItem,
  } = useCartItemHandler({
    productId: item.product.id,
  });

  return (
    <S.CardContainer>
      <S.CardContent>
        <S.ItemImg
          src={item.product.imageUrl}
          alt={`${item.product.name}사진`}
        />
        <S.CardDetail>
          <S.CardInfo>
            <S.CardHeader>
              <S.ProductName>{item.product.name}</S.ProductName>
              <S.DeleteButton onClick={handleDeleteCartItem}>
                {BUTTON_MESSAGE.DELETE}
              </S.DeleteButton>
            </S.CardHeader>
            <S.ProductPrice>
              {item.product.price.toLocaleString()}원
            </S.ProductPrice>
          </S.CardInfo>
          <S.CardQuantityButtonContainer>
            <S.CountButton onClick={handleMinusCartItemQuantity}>
              {BUTTON_MESSAGE.MINUS}
            </S.CountButton>
            <S.QuantityCount>{itemQuantity}</S.QuantityCount>
            <S.CountButton onClick={handleAddCartItemQuantity}>
              {BUTTON_MESSAGE.PLUS}
            </S.CountButton>
          </S.CardQuantityButtonContainer>
        </S.CardDetail>
      </S.CardContent>
    </S.CardContainer>
  );
}

export default CartItemCard;

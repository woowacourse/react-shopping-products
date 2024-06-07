import * as S from './style';
import useCartItems from '../../hooks/useCartItems';
import Quantity from '../common/Quantity';
import Loading from '../common/Loading';

const CartItems = () => {
  const { data: cartItems, isLoading } = useCartItems();

  return (
    <S.CartItemsContainer>
      {isLoading ? (
        <Loading />
      ) : (
        cartItems?.map((cartItem) => (
          <S.CartItemContainer key={cartItem.id}>
            <S.CartItemImage src={cartItem.product.imageUrl} />
            <S.CartItemInfoContainer>
              <S.CartItemInfoWrapper>
                <S.CartItemTextWrapper>
                  <S.ProductName>{cartItem.product.name}</S.ProductName>
                  <S.Price>{cartItem.product.price.toLocaleString('ko-KR')}원</S.Price>
                </S.CartItemTextWrapper>
                <S.DeleteButton onClick={() => console.log('삭제')}>삭제</S.DeleteButton>
              </S.CartItemInfoWrapper>
              <Quantity cartId={cartItem.id} quantity={cartItem.quantity} />
            </S.CartItemInfoContainer>
          </S.CartItemContainer>
        ))
      )}
    </S.CartItemsContainer>
  );
};

export default CartItems;

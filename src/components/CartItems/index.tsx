import * as S from './style';
import useCartItems from '../../hooks/useCartItems';
import Quantity from '../common/Quantity';
import Loading from '../common/Loading';
import useHandleCartItems from '../../hooks/useHandleCartItems';
import { useContext } from 'react';
import { ToastContext } from '../../context/ToastProvider';

const CartItems = () => {
  const { showToast } = useContext(ToastContext);
  const { data: cartItems, isLoading } = useCartItems();
  const { deleteCart } = useHandleCartItems();

  const handleOnClickDeleteButton = async (cartItemId: number) => {
    try {
      await deleteCart.mutateAsync(cartItemId);
    } catch (error) {
      if (error instanceof Error) showToast(error.message);
    }
  };

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
                <S.DeleteButton onClick={() => handleOnClickDeleteButton(cartItem.id)}>
                  삭제
                </S.DeleteButton>
              </S.CartItemInfoWrapper>
              <Quantity deleteIfZero={false} cartId={cartItem.id} quantity={cartItem.quantity} />
            </S.CartItemInfoContainer>
          </S.CartItemContainer>
        ))
      )}
    </S.CartItemsContainer>
  );
};

export default CartItems;

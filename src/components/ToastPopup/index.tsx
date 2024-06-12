import * as S from './style';

import useCartItems from '../../hooks/useCartItems';
import useProducts from '../../hooks/useProducts';

import { MAX_CART_ITEMS_SIZE } from '../../constants/pagination';

const ToastPopup = () => {
  const { getCartItems, addCartItem, deleteCartItem, adjustCartItemQuantity } = useCartItems();
  const { getProducts } = useProducts();

  const isMaxCountExceeded = getCartItems.data && getCartItems.data.length >= MAX_CART_ITEMS_SIZE;

  const errorMessage =
    addCartItem.isError && isMaxCountExceeded
      ? '장바구니 최대 허용치를 초과하여'
      : addCartItem.isError
      ? '장바구니 추가 요청중'
      : deleteCartItem.isError
      ? '장바구니 삭제 요청중'
      : getCartItems.isError
      ? '장바구니 불러오기중'
      : getProducts.isError
      ? '상품 불러오기중'
      : adjustCartItemQuantity.isError
      ? '상품 수량 조절중'
      : '';

  return errorMessage ? (
    <S.ToastMessage>
      {`${errorMessage} 오류가 발생하였습니다.`}
      {<br />} {'잠시 후 다시 이용해주세요.'}
    </S.ToastMessage>
  ) : null;
};

export default ToastPopup;

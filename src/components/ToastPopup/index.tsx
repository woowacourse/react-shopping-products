import * as S from './style';

import { useContext } from 'react';

import { UseCartItemsContext } from '../../App';
import { UseProductsContext } from '../ShoppingProductsPage';

const ToastPopup = () => {
  const { cartItemsError } = useContext(UseCartItemsContext);
  const { productsError } = useContext(UseProductsContext);

  const errorMessage = cartItemsError ? '장바구니 요청중' : productsError ? '상품 불러오기중' : '';

  return errorMessage ? (
    <S.ToastMessage>
      {`${errorMessage} 오류가 발생하였습니다.`}
      {<br />} {'잠시 후 다시 이용해주세요.'}
    </S.ToastMessage>
  ) : null;
};

export default ToastPopup;

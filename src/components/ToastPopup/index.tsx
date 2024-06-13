import * as S from './style';

import { useContext } from 'react';
import { UseToastContext } from '../ShoppingProductsPage';

const ToastPopup = () => {
  const { errorMessage } = useContext(UseToastContext);

  return errorMessage ? (
    <S.ToastMessage>
      {`${errorMessage} 오류가 발생하였습니다.`}
      {<br />} {'잠시 후 다시 이용해주세요.'}
    </S.ToastMessage>
  ) : null;
};

export default ToastPopup;

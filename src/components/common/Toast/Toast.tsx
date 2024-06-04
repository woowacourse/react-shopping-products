import { createPortal } from 'react-dom';
import { useContext, useEffect, useState } from 'react';

import { ErrorContext } from '../../../store/ErrorContext';

import * as S from './Toast.style';

function Toast() {
  const errorContext = useContext(ErrorContext);
  const error = errorContext ? errorContext.error : null;
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (error) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [error]);

  return (
    showToast &&
    createPortal(
      <S.Container>
        <S.MessageText>{error?.message}</S.MessageText>
      </S.Container>,
      document.body,
    )
  );
}

export default Toast;

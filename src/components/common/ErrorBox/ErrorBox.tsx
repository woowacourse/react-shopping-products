import { TOAST_DURATION_TIME } from '../../../constants/constants';
import { useCartItemList } from '../../../pages/productListPage/context/useCartContext';
import * as S from './ErrorBox.styled';
import { useEffect, useState } from 'react';

interface ErrorBoxProps {
  backgroundColor: string;
}

function ErrorBox({ backgroundColor }: ErrorBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { errorMessage, setErrorMessage } = useCartItemList();

  useEffect(() => {
    if (errorMessage) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
        setErrorMessage('');
      }, TOAST_DURATION_TIME);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  if (!errorMessage) return null;

  return (
    isOpen && (
      <S.ErrorBoxContainer backgroundColor={backgroundColor}>
        <p>{errorMessage}</p>
      </S.ErrorBoxContainer>
    )
  );
}

export default ErrorBox;

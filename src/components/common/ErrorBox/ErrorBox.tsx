import { TOAST_DURATION_TIME } from '../../../constants/constants';
import { useError } from '../../../contexts/ErrorContext';
import * as S from './ErrorBox.styled';
import { useEffect, useState } from 'react';

interface ErrorBoxProps {
  message?: string;
  backgroundColor: string;
}

function ErrorBox({ message, backgroundColor }: ErrorBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { showError } = useError();

  useEffect(() => {
    if (message) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
        showError('');
      }, TOAST_DURATION_TIME);

      return () => clearTimeout(timer);
    }
  }, [message, showError]);

  if (!message) return null;

  return (
    isOpen && (
      <S.ErrorBoxContainer backgroundColor={backgroundColor}>
        <p>{message}</p>
      </S.ErrorBoxContainer>
    )
  );
}

export default ErrorBox;

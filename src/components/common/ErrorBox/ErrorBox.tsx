import { TOAST_DURATION_TIME } from '../../../constants/constants';
import * as S from './ErrorBox.styled';
import { Dispatch, useEffect, useState } from 'react';

interface ErrorBoxProps {
  backgroundColor: string;
  text: string;
  setErrorMessage: Dispatch<React.SetStateAction<string>>;
}

function ErrorBox({ backgroundColor, text, setErrorMessage }: ErrorBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (text) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
        setErrorMessage('');
      }, TOAST_DURATION_TIME);

      return () => clearTimeout(timer);
    }
  }, [text]);

  if (!text) return null;

  return (
    isOpen && (
      <S.ErrorBoxContainer backgroundColor={backgroundColor}>
        <p>{text}</p>
      </S.ErrorBoxContainer>
    )
  );
}

export default ErrorBox;

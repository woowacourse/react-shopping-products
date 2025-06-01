import { TOAST_DURATION_TIME } from '../../../constants/constants';
import * as S from './ErrorBox.styled';
import { useEffect, useState } from 'react';

interface ErrorBoxProps {
  errorId?: string;
  message?: string;
  backgroundColor: string;
  onClose?: (id: string) => void;
}

function ErrorBox({ errorId, message, backgroundColor, onClose }: ErrorBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setIsOpen(true);

      const timer = setTimeout(() => {
        setIsOpen(false);

        if (errorId && onClose) {
          onClose(errorId);
        }
      }, TOAST_DURATION_TIME);

      return () => clearTimeout(timer);
    }
  }, [message, errorId, onClose]);

  const handleCloseClick = () => {
    setIsOpen(false);
    if (errorId && onClose) {
      onClose(errorId);
    }
  };

  if (!message) return null;

  return (
    <S.ErrorBoxContainer backgroundColor={backgroundColor} isOpen={isOpen} onClick={handleCloseClick}>
      <p>{message}</p>
    </S.ErrorBoxContainer>
  );
}

export default ErrorBox;

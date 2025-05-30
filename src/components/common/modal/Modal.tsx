import * as S from './Modal.styles';
import { useEffect } from 'react';
import Button from '../button/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  hideCloseButton?: boolean;
}

const Modal = ({ isOpen, onClose, children, title, hideCloseButton = false }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keyup', handleEsc);
    return () => window.removeEventListener('keyup', handleEsc);
  }, [onClose]);
  return (
    <>
      {isOpen && (
        <>
          <S.Background onClick={onClose} />
          <S.ModalContainer>
            <S.Title>{title}</S.Title>
            <S.ModalContent>{children}</S.ModalContent>
            {!hideCloseButton && (
              <Button variant="largeBlack" name="닫기" onClick={onClose} type="button" id="close">
                닫기
              </Button>
            )}
          </S.ModalContainer>
        </>
      )}
    </>
  );
};

export default Modal;

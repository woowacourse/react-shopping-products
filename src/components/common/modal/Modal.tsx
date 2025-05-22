import * as S from './Modal.styles';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
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
            <S.ModalContainer>
              <S.Title>{title}</S.Title>
              <S.ModalContent>{children}</S.ModalContent>
            </S.ModalContainer>
          </S.ModalContainer>
        </>
      )}
    </>
  );
};

export default Modal;

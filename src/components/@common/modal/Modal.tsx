import * as S from './Modal.styles';
import { useEffect } from 'react';
import Button from '../button/Button';
import useFocusTrap from '../../../hooks/useFocusTrap';
import ModalPortal from './ModalPortal';

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
    if (isOpen) {
      window.addEventListener('keyup', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keyup', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, isOpen]);

  const { containerRef } = useFocusTrap({ isActive: isOpen });
  return (
    <>
      {isOpen && (
        <ModalPortal>
          <S.Background onClick={onClose} />
          <S.ModalContainer ref={containerRef}>
            <S.Title>{title}</S.Title>
            <S.ModalContent>{children}</S.ModalContent>
            {!hideCloseButton && (
              <Button
                size="large"
                color="black"
                name="닫기"
                onClick={onClose}
                type="button"
                id="close"
              >
                닫기
              </Button>
            )}
          </S.ModalContainer>
        </ModalPortal>
      )}
    </>
  );
};

export default Modal;

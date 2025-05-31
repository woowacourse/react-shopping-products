import * as S from './Modal.styles';
import { useEffect } from 'react';
import Button from '../button/Button';
import useFocusTrap from '../../../hooks/@common/useFocusTrap';
import ModalPortal from './ModalPortal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /**
   * 모달 상단에 고정적으로 표시할 제목입니다.
   * 스크롤되는 본문 영역(`children`)과는 분리되어 있어,
   * 콘텐츠가 길어져도 제목은 항상 고정되어 표시됩니다.
   * 필요하지 않은 경우 전달하지 않아도 됩니다.
   */
  title?: string;
  /**
   * 닫기 버튼을 숨길지 여부를 결정합니다.
   * 기본값은 `false`이며, 닫기 버튼을 표시합니다.
   */
  hideCloseButton?: boolean;
}

const Modal = ({ isOpen, onClose, children, title, hideCloseButton = false }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
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
            {title && <S.Title>{title}</S.Title>}
            <S.ScrollSection>{children}</S.ScrollSection>
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

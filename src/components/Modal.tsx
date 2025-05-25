import styled from '@emotion/styled';
import Button from './Button';
import { useEffect, useRef } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDialogElement>) => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [open]);

  return (
    <ModalContainer ref={modalRef} onClick={handleClickOutside} onClose={onClose}>
      <Title>{title}</Title>
      <ModalContent>{children}</ModalContent>
      <Button type="button" id="closeButton" name="닫기" variant="bigBlack" onClick={onClose}>
        닫기
      </Button>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.dialog`
  margin: 0 auto;
  top: auto;
  bottom: 0;
  padding: 32px 24px;
  box-sizing: border-box;

  width: 100%;
  max-width: var(--max-width-container);
  max-height: 50vh;

  display: flex;
  flex-direction: column;
  gap: 24px;

  border: none;
  border-radius: 8px;
`;

const Title = styled.h2`
  color: var(--color-black);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

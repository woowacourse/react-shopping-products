import { ModalBackground, ModalContainer } from './Modal.styles';

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  onModalClose: () => void;
}

function Modal({ children, isModalOpen, onModalClose }: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  return (
    <ModalBackground
      isOpen={isModalOpen}
      onClick={(e) => handleBackdropClick(e)}
    >
      <ModalContainer>{children}</ModalContainer>
    </ModalBackground>
  );
}

export default Modal;

import * as S from "./Modal.styled";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <S.ModalBackdrop onClick={onClose} />
      <S.ModalOverlay>
        <S.ModalContent onClick={(e) => e.stopPropagation()}>
          {children}
        </S.ModalContent>
      </S.ModalOverlay>
    </>
  );
}

export default Modal;

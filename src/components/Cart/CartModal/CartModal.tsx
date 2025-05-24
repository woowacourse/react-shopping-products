import { useRef } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../../../contexts/ModalContext";

import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { useEscapeClose } from "../../../hooks/useEscapeClose";
import Background from "./parts/Background";
import Container from "./parts/Container";
import Header from "./parts/Header";
import Content from "./parts/Content";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: "bottom" | "center";
  children: React.ReactNode;
}

function CartModal({
  isOpen,
  onClose,
  position = "center",
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);
  useEscapeClose(isOpen, onClose);

  if (!isOpen) return null;

  return createPortal(
    <div ref={modalRef}>
      <ModalContext.Provider value={{ onClose, position }}>
        {children}
      </ModalContext.Provider>
    </div>,
    document.body
  );
}

CartModal.Background = Background;
CartModal.Container = Container;
CartModal.Header = Header;
CartModal.Content = Content;

export default CartModal;

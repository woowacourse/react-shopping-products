import { useKeyPress } from "../../../../hook/useKeyPress";
import {
  ModalBackdrop,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalLayout,
  ModalTitle,
} from "./Modal.style";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
  title: string;
  footer: React.ReactNode;
}

export function Modal({
  isOpen,
  children,
  handleClose,
  title,
  footer,
}: ModalProps) {
  useKeyPress({
    targetKey: "Escape",
    enabled: !isOpen,
    onKeyMatch: handleClose,
  });

  return (
    <section
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      css={ModalLayout(isOpen)}
    >
      <div css={ModalBackdrop} onClick={handleClose} />
      <div css={ModalContainer}>
        <header id="modal-title" css={ModalTitle}>
          {title}
        </header>
        <main css={ModalContent}>{children}</main>
        <footer css={ModalFooter}>{footer}</footer>
      </div>
    </section>
  );
}

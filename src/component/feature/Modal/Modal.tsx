import { useLockUserInteraction } from "../../../hook/usePreventEvent";
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
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function Modal({ isOpen, children, title, footer }: ModalProps) {
  useLockUserInteraction(isOpen);

  return (
    <section
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      css={ModalLayout(isOpen)}
    >
      <div css={ModalBackdrop} />
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

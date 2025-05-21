import { ComponentProps, useContext } from "react";

import * as styles from "../styles/ModalContainer.style";
import closeIcon from "/assets/close.png";
import { ModalContext } from "../../../../contexts/ModalContext";
interface ContainerProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  position?: "center" | "bottom";
}

function Container({ children, size = "medium", ...props }: ContainerProps) {
  const ctx = useContext(ModalContext);

  const sizeClass =
    ctx?.position === "bottom"
      ? styles.modalContents("full")
      : styles.modalContents(size);

  return (
    <div
      {...props}
      id="modal-container"
      css={sizeClass}
      onClick={(e) => e.stopPropagation()}
      aria-modal="true"
    >
      <button
        id="modal-close-button"
        css={styles.closeButton}
        onClick={ctx?.onClose}
      >
        <img src={closeIcon} alt="닫기" />
      </button>

      {children}
    </div>
  );
}
export default Container;

import { ComponentProps, useContext } from "react";

import * as styles from "../styles/ModalContainer.style";
import { ModalContext } from "../../../../contexts/ModalContext";
interface ModalContainerProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  position?: "center" | "bottom";
}

function Container({
  children,
  size = "medium",
  ...props
}: ModalContainerProps) {
  const ctx = useContext(ModalContext);

  const sizeClass =
    ctx?.position === "bottom"
      ? styles.modalContentsCss("full")
      : styles.modalContentsCss(size);

  return (
    <div
      {...props}
      id="modal-container"
      css={sizeClass}
      onClick={(e) => e.stopPropagation()}
      aria-modal="true"
    >
      {children}
    </div>
  );
}
export default Container;

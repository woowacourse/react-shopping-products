import { ComponentProps, useContext } from "react";
import * as styles from "../styles/ModalBackground.style";

import { ModalContext } from "../../../../contexts/ModalContext";

interface ModalBackgroundProps extends ComponentProps<"div"> {
  children: React.ReactNode;
}

function Background({ children, ...props }: ModalBackgroundProps) {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("ModalContext는 ModalProvider 안에 있어야 합니다.");
  }
  return (
    <div
      {...props}
      id="modal-background"
      css={styles.modalBackgroundCss(ctx.position)}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          ctx.onClose();
        }
      }}
    >
      {children}
    </div>
  );
}

export default Background;

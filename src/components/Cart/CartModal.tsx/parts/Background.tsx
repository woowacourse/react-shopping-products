import { ComponentProps, useContext } from "react";
import * as styles from "../styles/ModalBackground.style";

import { ModalContext } from "../../../../contexts/ModalContext";

interface BackgroundProps extends ComponentProps<"div"> {
  children: React.ReactNode;
}

function Background({ children, ...props }: BackgroundProps) {
  const ctx = useContext(ModalContext)!;
  return (
    <div
      {...props}
      id="modal-background"
      css={styles.modalBackground(ctx.position)}
      onClick={ctx.onClose}
    >
      {children}
    </div>
  );
}

export default Background;

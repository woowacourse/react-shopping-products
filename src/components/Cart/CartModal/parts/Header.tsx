import { ComponentProps } from "react";
import * as styles from "../styles/ModalHeader.style";

interface ModalHeaderProps extends ComponentProps<"header"> {
  children: React.ReactNode;
}

function Header({ children, ...props }: ModalHeaderProps) {
  return (
    <div id="modal-header" css={styles.headerContainerCss}>
      <header
        {...props}
        css={styles.modalHeaderCss}
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" css={styles.titleCss}>
          {children}
        </h2>
      </header>
    </div>
  );
}
export default Header;

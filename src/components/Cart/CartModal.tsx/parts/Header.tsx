import { ComponentProps } from "react";
import * as styles from "../styles/ModalHeader.style";

interface HeaderProps extends ComponentProps<"header"> {
  children: React.ReactNode;
}

function Header({ children, ...props }: HeaderProps) {
  return (
    <div id="modal-header" css={styles.headerContainer}>
      <header {...props} css={styles.modalHeader} aria-labelledby="modal-title">
        <h2 id="modal-title" css={styles.title}>
          {children}
        </h2>
      </header>
    </div>
  );
}
export default Header;

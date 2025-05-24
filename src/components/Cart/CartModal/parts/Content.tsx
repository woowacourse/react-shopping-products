import { ComponentProps } from "react";
import * as styles from "../styles/ModalContent.style";
interface ModalContentProps extends ComponentProps<"div"> {}

function Content({ children, ...props }: ModalContentProps) {
  return (
    <div css={styles.modalContentsCss} {...props}>
      {children}
    </div>
  );
}
export default Content;

import { baseButtonStyle } from "../styles";
import { ModalButtonProps } from "../types/Modal.types";

const BaseButton = ({ children, css: overrideCss, disabled, ...rest }: ModalButtonProps) => {
  return (
    <button {...rest} css={[baseButtonStyle, overrideCss]} disabled={disabled}>
      {children}
    </button>
  );
};

export default BaseButton;

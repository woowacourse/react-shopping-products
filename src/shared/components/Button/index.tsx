import { baseButtonStyle } from '../Modal/styles';
import { ModalButtonProps } from '../Modal/types/Modal.types';

const BaseButton = ({ children, css: overrideCss, disabled, ...rest }: ModalButtonProps) => {
  return (
    <button {...rest} css={[baseButtonStyle, overrideCss]} disabled={disabled}>
      {children}
    </button>
  );
};

export default BaseButton;

import { CancelButtonStyle } from '../styles';
import { ModalButtonProps } from '../types/Modal.types';
import ModalButton from './Button';

interface CancelButtonProps extends ModalButtonProps {
  variation?: 'primary' | 'secondary';
}

const CancelButton = ({ children = '취소', variation = 'primary', ...rest }: CancelButtonProps) => (
  <ModalButton css={CancelButtonStyle(variation)} aria-label="취소" {...rest}>
    {children}
  </ModalButton>
);

export default CancelButton;

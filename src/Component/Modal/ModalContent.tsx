import { ReactElement } from 'react';
import styled from '@emotion/styled';

interface ModalContentProps {
  children: ReactElement[] | ReactElement;
  position: 'top' | 'bottom' | 'center';
  size?: 'small' | 'medium' | 'large';
}

type SizeKey = 'small' | 'medium' | 'large';

const pxBySize: Record<SizeKey, number> = {
  small: 320,
  medium: 400,
  large: 600,
};

const radius = {
  top: '0px 0px 8px 8px',
  center: '8px',
  bottom: '8px 8px 0px 0px',
};

function ModalContent({ children, position, size }: ModalContentProps) {
  return (
    <StyledModal
      id="modal-content"
      position={position}
      size={size}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </StyledModal>
  );
}

export default ModalContent;

interface BoxProps {
  size?: SizeKey;
}

type modalStyledProps = Pick<ModalContentProps, 'position'> & BoxProps;

const StyledModal = styled.div<modalStyledProps>`
  width: ${(props) => (props.size ? `${pxBySize[props.size]}px` : '100%')};
  padding: 26px 16px;
  background: #fff;
  box-sizing: border-box;
  position: absolute;
  top: ${(props) => (props.position === 'top' ? '0px' : 'auto')};
  border-radius: ${(props) => radius[props.position]};
  bottom: ${(props) => (props.position === 'bottom' ? '0px' : 'auto')};
  z-index: 10;
`;

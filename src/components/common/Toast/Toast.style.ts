import { css } from '@emotion/css';
import { ToastStyleProps, ToastVarientType } from './Toast';

const getBackground = (varient: ToastVarientType) => {
  switch (varient) {
    case 'success': {
      return '#d1fcba';
    }
    case 'error': {
      return '#ffc9c9';
    }
    default: {
      return '#ffffff';
    }
  }
};

export const toastContainer = ({ varient }: ToastStyleProps) => css`
  background-color: ${getBackground(varient)};
  position: fixed;
  width: inherit;
  height: 40px;
  top: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;

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
  width: 429px;
  height: 40px;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%);
  top: 64px;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 9999;
`;

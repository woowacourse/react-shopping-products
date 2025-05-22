import { css } from '@emotion/css';
import { ToastStyleProps, ToastvariantType } from './Toast';

const getBackground = (variant: ToastvariantType) => {
  switch (variant) {
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

export const toastContainer = ({ variant }: ToastStyleProps) => css`
  background-color: ${getBackground(variant)};
  position: fixed;
  width: 429px;
  height: 40px;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;

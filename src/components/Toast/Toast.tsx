import { css } from '@emotion/css';

type ToastVarientType = 'success' | 'error';

type ToastProps = {
  text: string;
  varient: ToastVarientType;
};

type ToastStyleProps = Omit<ToastProps, 'text'>;

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

const toastContainer = ({ varient }: ToastStyleProps) => css`
  background-color: ${getBackground(varient)};
  position: fixed;
  width: inherit;
  height: 40px;
  top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;

function Toast({ text, varient }: ToastProps) {
  return <div className={toastContainer({ varient })}>{text}</div>;
}

export default Toast;

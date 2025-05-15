import { toastContainer } from './Toast.style';

export type ToastVarientType = 'success' | 'error';

type ToastProps = {
  text: string;
  varient: ToastVarientType;
};

export type ToastStyleProps = Omit<ToastProps, 'text'>;

function Toast({ text, varient }: ToastProps) {
  return <div className={toastContainer({ varient })}>{text}</div>;
}

export default Toast;

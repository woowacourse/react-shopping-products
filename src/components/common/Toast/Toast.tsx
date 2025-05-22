import { toastContainer } from './Toast.style';

export type ToastvariantType = 'success' | 'error';

export type ToastType = {
  id?: number;
  text: string;
  variant: ToastvariantType;
};

export type ToastStyleProps = Omit<ToastType, 'text'>;

function Toast({ text, variant }: ToastType) {
  return <div className={toastContainer({ variant })}>{text}</div>;
}

export default Toast;

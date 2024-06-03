import { ToastType } from '@/hooks/useToast';
import styles from './Toast.module.css';

const Toast = ({ message, type }: { message: string; type: ToastType }) => {
  return <li className={`${styles.toast} ${type === 'alert' ? styles.alert : ''}`}>{message}</li>;
};

export default Toast;

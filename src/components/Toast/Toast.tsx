import styles from './Toast.module.css';

const Toast = ({ message }: { message: string }) => {
  return <div className={styles.toast}>{message}</div>;
};

export default Toast;

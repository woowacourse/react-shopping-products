import { useEffect, useState } from 'react';
import eventEmitter from '@/services/eventEmitter';
import styles from './toast.module.css';

interface ToastMessage {
  id: number;
  message: string;
  type: 'default' | 'warning' | 'error' | 'success';
  duration: number;
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [exitingToasts, setExitingToasts] = useState<number[]>([]);
  const [enteringToasts, setEnteringToasts] = useState<number[]>([]);

  useEffect(() => {
    const handleNewToast = ({ message, type, duration }: ToastMessage) => {
      const id = Date.now();
      setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
      setEnteringToasts((prev) => [...prev, id]);

      setTimeout(() => {
        setEnteringToasts((prev) => prev.filter((toastId) => toastId !== id));
      }, 0);

      setTimeout(() => {
        setExitingToasts((prev) => [...prev, id]);
        setTimeout(() => {
          setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
          setExitingToasts((prev) => prev.filter((toastId) => toastId !== id));
        }, 500);
      }, duration);
    };

    const unsubscribe = eventEmitter.subscribe('toast', handleNewToast);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.toast_container}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]} ${
            enteringToasts.includes(toast.id) ? styles.entering : styles.entered
          } ${exitingToasts.includes(toast.id) ? styles.exiting : ''}`}
        >
          {toast.message}
          <div
            className={styles.progress_bar}
            style={{
              animationDuration: `${toast.duration}ms`,
              width: exitingToasts.includes(toast.id) ? '0%' : '100%',
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

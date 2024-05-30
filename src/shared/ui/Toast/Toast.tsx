import { useState, useEffect } from 'react';

import css from './Toast.module.css';

interface ToastProps {
  children: string;
  duration?: number;
}

export function Toast({ children, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return <div className={css.toast}>{children}</div>;
}

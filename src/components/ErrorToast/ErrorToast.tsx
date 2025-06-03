import { useEffect } from 'react';
import * as styles from './ErrorToast.style';

export default function ErrorToast({
  error,
  onClose,
  duration = 2000
}: {
  error: Error;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div data-testid="error-toast" css={styles.toastCss}>
      <h2 css={styles.messageCss}>{error.message}</h2>
      <button css={styles.closeButtonCss} onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

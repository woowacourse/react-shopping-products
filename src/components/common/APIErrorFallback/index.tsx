import { useState } from 'react';
import Toast from '../ToastModal';

interface APIErrorFallbackProps {
  errorMessage: string;
}

export default function APIErrorFallback({
  errorMessage,
}: APIErrorFallbackProps) {
  const [isVisible, setOpen] = useState(!!errorMessage);
  const closeToast = () => setOpen(false);

  return (
    isVisible && (
      <Toast message={errorMessage} duration={3000} onClose={closeToast} />
    )
  );
}

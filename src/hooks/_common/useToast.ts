import { useState, useEffect } from 'react';

interface Props {
  isError: boolean;
  duration?: number;
}

const useToast = ({ isError, duration = 3000 }: Props) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isError) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isError, duration]);

  return showToast;
};

export default useToast;

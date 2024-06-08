import { useState, useEffect } from 'react';

const useToast = (duration = 3000) => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    setIsToastVisible(true);
    const timer = setTimeout(() => {
      setIsToastVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  return isToastVisible;
};

export default useToast;

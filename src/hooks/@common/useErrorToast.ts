import { useState } from 'react';
import {
  ERROR_MESSAGE_DURATION,
  ERROR_MESSAGE_ANIMATION_DELAY,
} from '../../constants/systemConstants';

const useErrorToast = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleErrorMessage = (message: string) => {
    if (isToastVisible || errorMessage.length !== 0) return;

    setErrorMessage(message);
    setIsToastVisible(true);

    setTimeout(() => {
      setIsToastVisible(false);
    }, ERROR_MESSAGE_DURATION);

    setTimeout(() => {
      setErrorMessage('');
    }, ERROR_MESSAGE_DURATION + ERROR_MESSAGE_ANIMATION_DELAY);
  };

  return { errorMessage, isToastVisible, handleErrorMessage };
};

export default useErrorToast;

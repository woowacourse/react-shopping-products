import Toast from '@components/common/Toast/Toast';
import {
  ANIMATION_DURATION,
  TOAST_DISPLAY_DURATION,
} from '@components/common/Toast/provider/ToastProvidet.constant';
import { useEffect, useRef, useState } from 'react';

interface APIErrorToastProps {
  message: string;
}

const APIErrorToast = ({ message }: APIErrorToastProps) => {
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [isRemove, setIsRemove] = useState(true);

  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setIsRemove(false);
    setIsOpenToast(true);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const timer = setTimeout(() => {
      setIsOpenToast(false);
      setTimeout(() => {
        setIsRemove(true);
      }, ANIMATION_DURATION);

      toastTimer.current = timer;
    }, TOAST_DISPLAY_DURATION);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return <>{!isRemove && <Toast isOpen={isOpenToast} message={message} />}</>;
};

export default APIErrorToast;

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import * as Styled from './Toast.styled';

interface ToastProp {
  isError: boolean;
  errorMessage: string;
}
const Toast = ({ errorMessage, isError }: ToastProp) => {
  const [isToast, setIsToast] = useState(false);

  const toastMessage = () => {
    setTimeout(() => {
      setIsToast(false);
    }, 3000);

    setIsToast(true);
  };

  useEffect(() => {
    if (isError) toastMessage();
  }, [isError]);

  return (
    <>
      {isToast &&
        createPortal(<Styled.ToastContainer>{errorMessage}</Styled.ToastContainer>, document.body)}
    </>
  );
};

export default Toast;

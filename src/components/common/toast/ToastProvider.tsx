import { PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';

import * as Styled from './Toast.styled';

import { ToastContext } from '@/context/toast';

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toastMessage, setToastMessage] = useState('');
  const isShow = Boolean(toastMessage);

  const error = (message: string) => {
    setTimeout(() => {
      setToastMessage('');
    }, 3000);

    setToastMessage(message);
  };

  return (
    <ToastContext.Provider value={{ isShow, error }}>
      {children}
      {toastMessage &&
        createPortal(<Styled.ToastContainer>{toastMessage}</Styled.ToastContainer>, document.body)}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

import React from 'react';
import { ToastContainer } from './Toast.style';
import { ToastProps } from './Toast.type';

const Toast: React.FC<ToastProps> = ({ children }) => {
  return <ToastContainer> {children}</ToastContainer>;
};

export default Toast;

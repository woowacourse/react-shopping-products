import React from 'react';
import { ToastContainer } from './Toast.style';

interface ToastProps {
  children: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({ children }) => {
  return <ToastContainer> {children}</ToastContainer>;
};

export default Toast;

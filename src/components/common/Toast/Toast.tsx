import * as Styled from './Toast.styled';

interface ToastProps {
  message: string;
  isOpen: boolean;
}

const Toast = ({ message, isOpen }: ToastProps) => {
  return <Styled.ToastContainer $isOpen={isOpen}>{message}</Styled.ToastContainer>;
};

export default Toast;

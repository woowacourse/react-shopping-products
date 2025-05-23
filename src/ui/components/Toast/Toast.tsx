import { ToastContainer, Message } from './Toast.styles';

interface ToastProps {
  message: string;
}

function Toast({ message }: ToastProps) {
  return (
    <ToastContainer>
      <Message>{message}</Message>
    </ToastContainer>
  );
}

export default Toast;

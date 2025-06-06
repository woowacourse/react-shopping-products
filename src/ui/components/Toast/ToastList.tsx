import Toast from './Toast';
import { useToast } from '../../../context/ToastContext';
import { Container } from './Toast.styles';

function ToastList() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <Container>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          duration={toast.duration}
          onExit={() => removeToast(toast.id)}
        />
      ))}
    </Container>
  );
}

export default ToastList;

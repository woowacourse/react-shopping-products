import { useToast } from '../../../context/ToastContext';
import Toast from './Toast';

function ToastList() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} />
      ))}
    </>
  );
}

export default ToastList;

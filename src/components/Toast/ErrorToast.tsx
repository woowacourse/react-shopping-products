import S from './ErrorToast.module.css';

interface ErrorToastProps {
  isError: boolean;
  message: string;
}

const ErrorToast = ({ isError, message }: ErrorToastProps) => {
  return (
    isError && (
      <div className={S.toastContainer}>
        <p className={S.toastText}>{message}</p>
      </div>
    )
  );
};

export default ErrorToast;

import { ErrorMessage, ErrorToastContainer } from "./ErrorToast.css";

interface ErrorToastProps {
  errorMessage: string;
}

function ErrorToast({ errorMessage }: ErrorToastProps) {
  if (!errorMessage) return null;

  return (
    <div role="alert" aria-atomic="true" css={ErrorToastContainer}>
      <p css={ErrorMessage}>{errorMessage}</p>
    </div>
  );
}

export default ErrorToast;

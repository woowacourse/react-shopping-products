import { ErrorMessage, ErrorToastContainer } from "./ErrorToast.css";

interface ErrorToastProps {
  errorMessage: string;
}

function ErrorToast({ errorMessage }: ErrorToastProps) {
  if (!errorMessage) return null;

  return (
    <div css={ErrorToastContainer}>
      <p css={ErrorMessage}>{errorMessage}</p>
    </div>
  );
}

export default ErrorToast;

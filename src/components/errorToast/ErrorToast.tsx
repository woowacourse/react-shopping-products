import { ErrorMessage, ErrorToastContainer } from "./ErrorToast.css";

interface ErrorToastProps {
  errorMessage: string;
}

function ErrorToast({ errorMessage }: ErrorToastProps) {
  return (
    <div css={ErrorToastContainer}>
      <p css={ErrorMessage}>{errorMessage}</p>
    </div>
  );
}

export default ErrorToast;

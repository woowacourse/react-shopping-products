import { useError } from "../../hooks/useError";
import { ErrorMessage, ErrorToastContainer } from "./ErrorToast.css";

function ErrorToast() {
  const { isError, errorMessage } = useError();
  if (isError) {
    return (
      <div css={ErrorToastContainer}>
        <p css={ErrorMessage}>{errorMessage}</p>
      </div>
    );
  }
}

export default ErrorToast;

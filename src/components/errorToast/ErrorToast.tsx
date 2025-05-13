import { ErrorMessage, ErrorToastContainer } from "./ErrorToast.css";

function ErrorToast() {
  return (
    <div css={ErrorToastContainer}>
      <p css={ErrorMessage}>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
    </div>
  );
}

export default ErrorToast;

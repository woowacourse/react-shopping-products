import { css } from "@emotion/css";

const ErrorToast = () => {
  return (
    <div className={ErrorToastStyles}>
      <p>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
    </div>
  );
};

export default ErrorToast;

const ErrorToastStyles = css`
  width: 430px;
  position: fixed;
  top: 64px;
  background-color: #ffc9c9;
  text-align: center;
  padding: 12px 0;
`;

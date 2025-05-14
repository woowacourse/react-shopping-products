import { css } from "@emotion/css";

const ErrorToast = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className={ErrorToastStyles}>
      <p>{errorMessage}</p>
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

import { css } from '@emotion/css';

const ErrorToast = ({ message }: { message: string }) => {
  return (
    <div className={ErrorToastStyles}>
      <p>{message}</p>
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
  z-index: 100;
`;

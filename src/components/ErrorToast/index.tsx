import { css } from "@emotion/css";
import { useEffect } from "react";
import { useErrorContext } from "../../contexts/Error/ErrorContext";

const ErrorToast = ({ errorMessage }: { errorMessage: string }) => {
  const { handleError } = useErrorContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleError({ isError: false, errorMessage: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [handleError]);

  return (
    <div className={ErrorToastStyles}>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorToast;

const ErrorToastStyles = css`
  width: 420px;
  position: fixed;
  bottom: 64px;
  background-color: #ffc9c9;
  text-align: center;
  border-radius: 8px;
  padding: 12px 0;
  z-index: 2000;
`;

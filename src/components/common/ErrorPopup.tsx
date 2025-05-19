import { css, keyframes } from "@emotion/react";
import { useEffect } from "react";
import Text from "./Text";
import { useErrorMessage } from "../../contexts";

const ErrorPopup = () => {
  const { errorMessage, clearErrorMessage } = useErrorMessage();

  useEffect(() => {
    setTimeout(() => {
      clearErrorMessage();
    }, 3000);
  }, [clearErrorMessage]);

  if (errorMessage)
    return (
      <div css={errorPopupStyle}>
        <Text variant="body-2">{errorMessage}</Text>
      </div>
    );
};

export default ErrorPopup;

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const errorPopupStyle = css`
  width: 100%;
  max-width: 430px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 66px;
  left: 0;
  text-align: center;
  color: #000;
  background-color: #ffc9c9;
  padding: 12px 0;
  animation: ${slideDown} 0.3s ease-out;
`;

import { css } from "@emotion/react";
import Text from "./Text";
import { useEffect } from "react";

const ErrorPopup = ({
  errorMessage,
  setErrorMessage,
}: {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [setErrorMessage]);

  return (
    <div css={errorPopupStyle}>
      <Text variant="body-2">{errorMessage}</Text>
    </div>
  );
};

export default ErrorPopup;

const errorPopupStyle = css`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  text-align: center;
  color: #000;
  background-color: #ffc9c9;
  padding: 12px 0;
`;

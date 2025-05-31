import { css } from "@emotion/css";

interface ButtonProps {
  title: string;
  onClick: () => void;
  buttonStyled?: React.CSSProperties;
  textStyled?: React.CSSProperties;
  disabled?: boolean;
  isLoading?: boolean;
}
const Button = ({
  title,
  onClick,
  buttonStyled,
  textStyled,
  disabled = false,
  isLoading = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={isLoading ? ButtonLoadingStyles : ButtonStyles}
      style={buttonStyled}
      disabled={disabled || isLoading}
    >
      <div className={ButtonTextStyles} style={textStyled}>
        {title}
      </div>
    </button>
  );
};

export default Button;

const ButtonStyles = css`
  border-radius: 8px;
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const ButtonLoadingStyles = css`
  border-radius: 8px;
  width: 24px;
  height: 24px;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  &:disabled {
    cursor: wait;
  }
`;

const ButtonTextStyles = css`
  color: #363636;
  font-size: 20px;
  text-align: center;
`;
